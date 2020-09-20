// listners
const onMessageReceivedByContentScript = function (request, sender, sendResponse) {
  switch (request.action) {
    case chromeActions.IS_IMAGE_AVAILABLE_TO_DOWNLOAD: {
      if (document.querySelector(".zZYga ._9AhH0") !== null) {
        chrome.runtime.sendMessage(createMsgObject(chromeActions.IMAGE_IS_AVAILABLE));
      } else {
        chrome.runtime.sendMessage(createMsgObject(chromeActions.IMAGE_IS_NOT_AVAILABLE));
      }
      break;
    }
    case chromeActions.SEND_IMAGE_URL: {
      const imgUrl = document.querySelector(".zZYga .FFVAD").src;
      chrome.runtime.sendMessage(createMsgObject(chromeActions.RECEIVE_IMG_URL, { imgUrl }));
      break;
    }
    case chromeActions.DOWNLOAD_IMAGE: {
      const imgUrl = request.msgObject.imgUrl;
      chrome.runtime.sendMessage(createMsgObject(chromeActions.DOWNLOAD_IMAGE, { imgUrl }));
      break;
    }
    default:
      break;
  }
};

// attachign the listners
chrome.runtime.onMessage.addListener(onMessageReceivedByContentScript);
