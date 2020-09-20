const chromeActions = {
  IMAGE_IS_AVAILABLE: "IMAGE_IS_AVAILABLE",
  SEND_IMAGE_URL: "SEND_IMAGE_URL",
  IMAGE_IS_NOT_AVAILABLE: "IMAGE_IS_NOT_AVAILABLE",
  RECEIVE_IMG_URL: "RECEIVE_IMG_URL",
  IS_IMAGE_AVAILABLE_TO_DOWNLOAD: "IS_IMAGE_AVAILABLE_TO_DOWNLOAD",
};
const createMsgObject = function (action, msgObject = null) {
  return {
    action,
    msgObject,
  };
};
