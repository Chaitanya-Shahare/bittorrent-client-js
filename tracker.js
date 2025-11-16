"use strict";

import dgram from "dgram";
import { Buffer } from "buffer";
import { parse as urlParse } from "url";

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
  // ...
};

const parseConnResp = (resp) => {
  // ...
};

const buildAnnounceReq = (resp) => {
  // ...
};

const parseAnnounceResp = (resp) => {
  // ...
};
