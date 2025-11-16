import fs from "fs";
import bencode from "bencode";

import dgram from "dgram";
import { Buffer } from "buffer";
import { parse as urlParse } from "url";

import tracker from "./tracker";
import torrentParser from "./torrent-parser";

const torrent = torrentParser.open("puppy.torrent");

tracker.getPeers(torrent, (peers) => {
  console.log("list of peers: ", peers);
});
