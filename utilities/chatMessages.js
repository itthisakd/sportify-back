const { DateTime } = require("luxon");

function formatMessage({ toId, fromId, message }) {
  return {
    roomId: [toId, fromId].sort((a, b) => a - b).join("-"),
    toId,
    fromId,
    message,
    time: DateTime.now(),
  };
}

module.exports = {
  formatMessage,
};
