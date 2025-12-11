const push_notification = async (res, title, body, fcm) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: fcm,
  };
  try {
    await admin.messaging().send(message);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error });
  }
};

module.exports = { push_notification };
