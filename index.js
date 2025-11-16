import tracker from "./src/tracker.js";
import torrentParser from "./src/torrent-parser.js";
import download from "./src/download.js";

const torrent = torrentParser.open(process.argv[2]);

// tracker.getPeers(torrent, (peers) => {
//   console.log("list of peers: ", peers);
// });

download(torrent);
