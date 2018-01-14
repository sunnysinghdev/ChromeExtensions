//Set some content from background page

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'log') {
        log("logged");
        // Create a new tab with options page
        // chrome.tabs.create({
        //     active: false,
        //     url: 'popup.html'
        // }, null);
    }
    if (request.message == 'notesFound') {
        chrome.browserAction.setIcon({
            path: "icon2.png"
        });
        //doenot work
        chrome.browserAction.setPopup({
            popup: "popup.html"
        });
        chrome.browserAction.setBadgeText({ text: "N+" });
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
        log("ddd");
    }
});