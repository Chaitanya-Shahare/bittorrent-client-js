import crypto from "crypto";

let id = null;

export const genId = () => {
  if (!id) {
    id = crypto.randomBytes(20);
    // CT -> Chaitanya Torrent
    Buffer.from("-AT0001-").copy(id, 0);
  }
  return id;
};

export default {
  genId,
};
