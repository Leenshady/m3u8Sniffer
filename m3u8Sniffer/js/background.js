var m3u8list=[];
var filename=[];
var tabs={};
var pattern = /http[s]?[://]{1}[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]*.m3u8$/
chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    var tmp;
    if(/\?/.test(details.url)){
        tmp = details.url.slice(0,details.url.indexOf("?"));
    }else{
        tmp = details.url;
    }
    //console.log(details.url);
    //console.log(tmp);
	if(pattern.test(tmp)){
        console.log(details.tabId);
        if(!(details.tabId in tabs)){
            tabs[details.tabId] ={};
            tabs[details.tabId].m3u8list=[];
            tabs[details.tabId].filename=[];
        }
        tabs[details.tabId].m3u8list.push(details.url);
        tabs[details.tabId].filename.push(tmp.slice(tmp.lastIndexOf("/")+1,tmp.length));
    }
}, {urls: ["<all_urls>"]},["requestHeaders"]);