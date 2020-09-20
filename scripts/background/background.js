const createFileName = function () {
    const date = new Date();
    const timeStamp = date.getTime();
    return timeStamp + '.jpg'
}
const showDesktopNotification = function () {
    var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
    var hour = time[1] % 12 || 12;               // The prettyprinted hour.
    var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
    new Notification(hour + time[2] + ' ' + period, {
        icon: 'images/icon-128.png',
        body: 'Download initiated'
    });
}
const downloadImage = function (imgUrl) {
    const downloadOptions = {
        url: imgUrl,
        filename: createFileName()
    }
    console.log(downloadOptions)
    chrome.downloads.download(downloadOptions, function (downloadId) {
        console.log(downloadId)
    })
}
const onMessageReceivedbybackground = function (request, sender, sendResponse) {
    const tabId = sender.tab.id
    switch (request.action) {
        case chromeActions.DOWNLOAD_IMAGE: {
            const imgUrl = request.msgObject.imgUrl
            downloadImage(imgUrl)
            showDesktopNotification()
            break;
        }
        default:
            break;
    }
}
chrome.runtime.onMessage.addListener(onMessageReceivedbybackground);
