import net from "net";
import { Buffer } from "buffer";
import tracker from "./tracker.js";

const download = (peer) => {
  console.log(peer);
  const socket = net.Socket();
  socket.on("error", console.log);

  socket.connect(peer.port, peer.ip, (msg) => {
    // socket.write(...) write a message here
    console.log("msg", msg);
  });

  onWholeMsg(socket, (data) => {
    // handle response here
  });
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
    peers.forEach(download);
  });
};

export default handlePeersDownload;
