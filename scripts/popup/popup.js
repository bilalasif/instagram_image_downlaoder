const showElement = function (selector) {
  document.querySelector(selector).style.display = "block";
}

const hideElement = function (selector) {
  document.querySelector(selector).style.display = "none";
}

const sendMessageToContentScript = function (tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}

// Listner callbacks
const onMessageReceivedByPopup = function (reqeust, sender, sendResponse) {
  const tabId = sender.tab.id;
  switch (reqeust.action) {
    case chromeActions.IMAGE_IS_AVAILABLE: {
      sendMessageToContentScript(
        tabId,
        createMsgObject(chromeActions.SEND_IMAGE_URL)
      );
      break;
    }
    case chromeActions.IMAGE_IS_NOT_AVAILABLE: {
      showElement(".no-content-to-download");
      hideElement(".loading-container");
      break;
    }
    case chromeActions.RECEIVE_IMG_URL: {
      document.querySelector(".thumnail-img").src = reqeust.msgObject.imgUrl;
      hideElement(".loading-container");
      showElement(".download-controls-container");
      break;
    }
    default:
      break;
  }
};

const onDocumentLoad = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabURL = tabs[0].url;
    var tabId = tabs[0].id;
    if (tabURL.indexOf("https://www.instagram.com/p") < 0) {
      showElement(".no-content-to-download");
    } else if (tabURL.indexOf("https://www.instagram.com/p") === 0) {
      showElement(".content-downloadable");
      showElement(".loading-container");
      setTimeout(function () {
        sendMessageToContentScript(
          tabId,
          createMsgObject(chromeActions.IS_IMAGE_AVAILABLE_TO_DOWNLOAD)
        );
      }, 500)

    }
  });
};

const onDownloadButtonClick = function (e) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tabId = tabs[0].id
    const imgUrl = document.querySelector('.thumnail-img').src
    sendMessageToContentScript(tabId, createMsgObject(chromeActions.DOWNLOAD_IMAGE, { imgUrl }))
  })
}

// attaching listners
chrome.runtime.onMessage.addListener(onMessageReceivedByPopup);
window.addEventListener("load", onDocumentLoad);
const downloadBtn = document.querySelector('.download-btn')
downloadBtn.addEventListener("click", onDownloadButtonClick)