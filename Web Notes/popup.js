var cur_url = "";
var code = 'var meta = document.querySelector("meta[name=\'description\']");' +
    'if (meta) meta = meta.getAttribute("content");' +
    '({' +
    '    title: document.title,' +
    '    description: meta || ""' +
    '});';
document.addEventListener("DOMContentLoaded", function() {
    var manifestData = chrome.runtime.getManifest();
    getId("version").innerText = manifestData.version;
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        cur_url = tabs[0].url;

        chrome.storage.sync.get(null, function(tags) {
            //console.log(JSON.stringify(obj));
            for (var tag in tags) {
                if (tags.hasOwnProperty(tag)) {
                    if (cur_url.indexOf(tag) >= 0) {
                        document.getElementById("tag").value = tag;
                        document.getElementById("notes").value = tags[tag];
                    } else {}
                }
            }
        });
        chrome.tabs.executeScript({
            code: code
        }, function(results) {
            if (!results) {
                // An error occurred at executing the script. You've probably not got
                // the permission to execute a content script for the current tab
                return;
            }
            var result = results[0];
            var trimUrl = cur_url.replace('https://', '').replace('http://', '').split('/')[0];
            if (result.title.length > 60)
                result.title = result.title.substring(0, 60);
            if (result.description.length > 116)
                result.description = result.description.substring(0, 116);
            getId("web_title").innerText = result.title; //.substring(0, 20);
            getId("web_icon").src = 'http://www.google.com/s2/favicons?domain=' + trimUrl;

            getId("desc").innerText = result.description;
            getId("link_text").innerText = trimUrl;
            getId("web_link").href = cur_url;
        });
    });



});

function log(msg) {
    var log = 'console.log("' + msg + '")';
    chrome.tabs.executeScript({
        code: log
    }, function(results) {});
};

function resetIcon() {
    chrome.browserAction.setBadgeText({ text: "" });
    chrome.browserAction.setIcon({
        path: "icon.png"
    });
};

function getId(id) {
    return document.getElementById(id);
};
document.getElementById('btn_save').onclick = function() {

    var setObj = {};
    setObj[getId("tag").value] = getId("notes").value;
    chrome.storage.sync.set(setObj);
    chrome.runtime.sendMessage({ message: 'log' },
        function() {
            /* callback */
            window.close();
        });

    const rows = [
        ["name1", "you s up", "some other info"],
        ["name2", "city2", "more info"]
    ];
    //CSV.download(rows);
};
//------------Start--------------------
resetIcon();