const admin = require("../firebase-init");
const { BadRequest } = require("../errors");

const push_notification = async (title, body, device_token) => {
  const message = {
    notification: {
      title,
      body,
    },
    android: {
      notification: {
        sound: "notification",
      },
    },
    apns: {
      payload: {
        aps: {
          sound: "notification",
        },
      },
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
