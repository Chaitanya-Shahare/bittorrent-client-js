import fs from "fs";
import bencode from "bencode";

import dgram from "dgram";
import { Buffer } from "buffer";
import { parse as urlParse } from "url";

import tracker from "./tracker";

const torrent = bencode.decode(fs.readFileSync("puppy.torrent"), "utf8");
// const torrent = bencode.decode(
//   fs.readFileSync("big-buck-bunny.torrent"),
//   "utf8",
// );

tracker.getPeers(torrent, (peers) => {
  console.log("list of peers: ", peers);
});
