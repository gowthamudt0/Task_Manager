const crypto = require("crypto");

function generateUniqueId() {
  return crypto.randomBytes(16).toString("hex");
}

module.exports = generateUniqueId;
