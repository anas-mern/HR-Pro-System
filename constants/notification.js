const { BadRequest } = require("../errors");

const push_notification = async (res, title, body, fcm) => {
  const message = {
    notification: {
      title,
      body,
      token: fcm,
    },
  };
  try {
    await admin.messaging().send(message);
  } catch (error) {
    throw new BadRequest("Unexpected Error In Sending Notification");
  }
};

module.exports = { push_notification };
