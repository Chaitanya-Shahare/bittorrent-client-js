import tracker from "./src/tracker.js";
import torrentParser from "./src/torrent-parser.js";

const torrent = torrentParser.open("big-buck-bunny.torrent");

tracker.getPeers(torrent, (peers) => {
  console.log("list of peers: ", peers);
});
