window.addEventListener("load", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tabURL = tabs[0].url;
    if (tabURL.indexOf("https://www.instagram.com/p") < 0) {
      document.getElementsByClassName(
        "no-content-to-download"
      )[0].style.display = "block";
    } else if (tabURL.indexOf("https://www.instagram.com/p") === 0) {
      document.getElementsByClassName(
        "checking-content-downloadable"
      )[0].style.display = "block";
    }
  });
});
