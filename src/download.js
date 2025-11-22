import net from "net";
import { Buffer } from "buffer";
import tracker from "./tracker.js";
import message from "./message.js";

const download = (peer, torrent) => {
  console.log(peer);
  const socket = net.Socket();
  socket.on("error", console.log);

  socket.connect(peer.port, peer.ip, (msg) => {
    socket.write(message.buildHandshake(torrent));
    console.log("msg", msg);
  });

  onWholeMsg(socket, (msg) => msgHandler(msg, socket));
};

function msgHandler(msg, socket) {
  if (isHandshake(msg)) {
    socket.write(message.buildInterested());
  } else {
    const m = message.parse(msg);

    if (m.id === 0) chokeHandler();
    if (m.id === 1) unchokeHandler();
    if (m.id === 4) haveHandler(m.payload);
    if (m.id === 5) bitfieldHandler(m.payload);
    if (m.id === 7) pieceHandler(m.payload);
  }
}

function chokeHandler() {
  //...
}

function unchokeHandler() {
  //...
}

function haveHandler(payload) {
  //...
}

function bitfieldHandler(payload) {
  //...
}

function pieceHandler(payload) {
  //...
}

const isHandshake = (msg) => {
  return (
    msg.length === msg.readUInt8(0) + 49 &&
    msg.toString("utf8", 1) === "BitTorrent protocol"
  );
};

const onWholeMsg = (socket, callback) => {
  let savedBuf = Buffer.alloc(0);
  let handshake = true;

  socket.on("data", (recvBuf) => {
    // msgLen calculates the length of a whole message
    //
    const msgLen = () =>
      handshake ? savedBuf.readUInt8(0) + 49 : savedBuf.readInt32BE(0) + 4;
    savedBuf = Buffer.concat([savedBuf, recvBuf]);

    while (savedBuf.length >= 4 && savedBuf.length >= msgLen()) {
      callback(savedBuf.slice(0, msgLen()));
      savedBuf = savedBuf.slice(msgLen());
      handshake = false;
    }
  });
};

const handlePeersDownload = (torrent) => {
  tracker.getPeers(torrent, (peers) => {
    peers.forEach((peer) => download(peer, torrent));
  });
};

export default handlePeersDownload;
