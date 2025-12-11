const { BadRequest } = require("../errors");

const push_notification = async (title, body, fcm) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: fcm,
  };
  console.log(title)
  console.log(body)
  console.log(fcm)
  console.log(message)
  try {
    await admin.messaging().send(message);
  } catch (error) {
    throw new BadRequest("Unexpected Error In Sending Notification");
  }
};

module.exports = { push_notification };
