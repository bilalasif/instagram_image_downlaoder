function showElement(selector) {
  document.querySelector(selector).style.display = "block";
}

function hideElement(selector) {
  document.querySelector(selector).style.display = "none";
}

chrome.runtime.onMessage.addListener(function (reqeust, sender, sendResponse) {
  switch (reqeust.action) {
    case "IMAGE_IS_AVAILABLE": {
      chrome.tabs.query({ active: true }, function (tabs) {
        const tabId = tabs[0].id;
        const msgObject = {
          action: "SEND_IMAGE_URL",
        };
        chrome.tabs.sendMessage(tabId, msgObject);
      });
      break;
    }
    case "IMAGE_IS_NOT_AVAILABLE": {
      showElement(".no-content-to-download");
      hideElement(".loading-container");
      break;
    }
    case "RECEIVE_IMG_URL": {
      document.querySelector(".thumnail-img").src = reqeust.imgUrl;
      hideElement(".loading-container");
      showElement(".download-controls-container");
      break;
    }
    default:
      break;
  }
});

window.addEventListener("load", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabURL = tabs[0].url;
    var tabId = tabs[0].id;
    if (tabURL.indexOf("https://www.instagram.com/p") < 0) {
      showElement(".no-content-to-download");
    } else if (tabURL.indexOf("https://www.instagram.com/p") === 0) {
      showElement(".content-downloadable");
      showElement(".loading-container");
      const msgObject = {
        action: "IS_IMAGE_AVAILABLE_TO_DOWNLOAD",
      };
      chrome.tabs.sendMessage(tabId, msgObject);
    }
  });
});
