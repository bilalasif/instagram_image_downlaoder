chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case "IS_IMAGE_AVAILABLE_TO_DOWNLOAD": {
      if (document.querySelector(".zZYga ._9AhH0") !== null) {
        const msgObject = {
          action: "IMAGE_IS_AVAILABLE",
        };
        chrome.runtime.sendMessage(msgObject);
      } else {
        const msgObject = {
          action: "IMAGE_IS_NOT_AVAILABLE",
        };
        chrome.runtime.sendMessage(msgObject);
      }
      break;
    }
    case "SEND_IMAGE_URL": {
      const imgUrl = document.querySelector(".zZYga .FFVAD").src;
      const msgObject = {
        action: "RECEIVE_IMG_URL",
        imgUrl,
      };
      chrome.runtime.sendMessage(msgObject);
    }
    default:
      break;
  }
});
