// var obj = {};
// obj["cur_url"] = window.location.href;
chrome.storage.sync.get(null, function(tags) {
    //console.log(JSON.stringify(obj));
    for (var tag in tags) {
        if (tags.hasOwnProperty(tag)) {
            var cur_url = window.location.href;
            if (tag) {
                if (cur_url.indexOf(tag) >= 0) {
                    console.log(tag + " = " + cur_url + " = " + window.location.href.indexOf(tag));

                    chrome.runtime.sendMessage({ message: 'notesFound' },
                        function() {
                            /* callback */
                        });
                } else {}
            }
        }
    }
});
// chrome.browserAction.onClicked.addListener(function callback() {
//     chrome.browserAction.setBadgeText({ text: "" });
// });
//chrome.browserAction.setBadgeText({ text: "con+" });