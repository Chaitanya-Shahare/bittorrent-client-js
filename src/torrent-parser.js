import fs from "fs";
import bencode from "bencode";
import crypto from "crypto";
import bignum from "bignum";

export const open = (filepath) => {
  return bencode.decode(fs.readFileSync(filepath), "utf8");
};

export const size = (torrent) => {
  const s = torrent.info.files
    ? torrent.info.files.map((file) => file.length).reduce((a, b) => a + b)
    : torrent.info.length;

  return bignum.toBuffer(s, { size: 8 });
};

export const infoHash = (torrent) => {
  const info = bencode.encode(torrent.info);
  return crypto.createHash("sha1").update(info).digest();
};

export default {
  open,
  size,
  infoHash,
};
