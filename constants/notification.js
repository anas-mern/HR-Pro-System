const admin = require("../firebase-init");
const { BadRequest } = require("../errors");

const push_notification = async (title, body, device_token) => {
  const message = {
    data: {
      title,
      body,
      playSound: "true",
      type: "normal",
    },
    token: device_token,
  };
  try {
    await admin.messaging().send(message);
  } catch (error) {
    console.error("Firebase messaging error:", error);
    throw new BadRequest(`Notification failed: ${error.message}`);
  }
};

module.exports = { push_notification };
