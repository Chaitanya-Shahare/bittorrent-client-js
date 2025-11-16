"use strict";

import dgram from "dgram";
import { Buffer } from "buffer";
import { parse as urlParse } from "url";
import crypto from "crypto";

export const getPeers = (torrent, callback) => {
  const socket = dgram.createSocket("udp4");
  const url = torrect.announce.toString("utf8");

  // 1. send connect request
  udpSend(socket, buildConnReq(), url);

  socket.on("message", (response) => {
    if (respType(response) === "connect") {
      // 2. receive and parse connect response
      const connResp = parseConnResp(response);
      // 3. send announce request
      const announceReq = buildAnnounceReq(connResp.connectionId);
      udpSend(socket, announceReq, url);
    } else if (respType(response) === "announce") {
      // 4. parse announce response
      const announceResp = parseAnnounceResp(response);
      // 5. pass peers to callback
      callback(announceResp.peers);
    }
  });
};

const udpSend = (socket, message, rawUrl, callback = () => {}) => {
  const url = urlParse(rawUrl);
  socket.send(message, 0, message.length, url.port, url.host, callback);
};

const respType = (resp) => {
  // ...
};

const buildConnReq = (resp) => {
  const buf = Buffer.alloc(16);

  // connection id
  buf.writeUint32BE(0x417, 0);
  buf.writeUint32BE(0x27101980, 4);
  // action
  buf.writeUint32BE(0, 8);
  // transaction id
  crypto.randomBytes(4).copy(buf, 12);

  return buf;
};

const parseConnResp = (resp) => {
  return {
    action: resp.readUInt32BE(0),
    transactionId: resp.readUInt32BE(4),
    connectionId: resp.slice(8),
  };
};

const buildAnnounceReq = (resp) => {
  // ...
};

const parseAnnounceResp = (resp) => {
  // ...
};
