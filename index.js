import fs from "fs";
import bencode from "bencode";

import dgram from "dgram";
import { Buffer } from "buffer";
import { parse as urlParse } from "url";

// const torrent = bencode.decode(fs.readFileSync("puppy.torrent"), "utf8");
const torrent = bencode.decode(
  fs.readFileSync("big-buck-bunny.torrent"),
  "utf8",
);
const url = urlParse(torrent.announce.toString("utf8"));

const socket = dgram.createSocket("udp4");

const myMsg = Buffer.from("Hello?", "utf8");

socket.send(myMsg, 0, myMsg.length, url.port, url.hostname, () => {
  console.log("sent");
});

socket.on("message", (msg) => {
  console.log("Message is", msg);
});
