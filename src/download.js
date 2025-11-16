import net from "net";
import { Buffer } from "buffer";
import tracker from "./src/tracker";

const download = (peer) => {
  const socket = net.Socket();
  socket.on("error", console.log);

  socket.connect(peer.port, peer.ip, () => {
    // socket.write(...) write a message here
  });
  socket.on("data", (data) => {
    // handle response here
  });
};

const handlePeersDownload = (torrent) => {
  tracker.getPeers(torrent, (peers) => {
    peers.forEach(download);
  });
};

export default handlePeersDownload;
