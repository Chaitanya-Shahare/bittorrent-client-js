import tracker from "./tracker.js";
import torrentParser from "./torrent-parser.js";

const torrent = torrentParser.open("big-buck-bunny.torrent");

tracker.getPeers(torrent, (peers) => {
  console.log("list of peers: ", peers);
});
