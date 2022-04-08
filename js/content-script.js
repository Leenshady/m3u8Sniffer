var m3u8list=[];
var filename=[];
var pattern = /http[s]?[://]{1}[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]*.m3u8$/
chrome.webRequest.onBeforeRequest.addListener(details => {
    var tmp;
    if(/\?/.test(details.url)){
        tmp = details.url.slice(0,details.url.indexOf("?"));
    }else{
        tmp = details.url;
    }
    //console.log(details.url);
    //console.log(tmp);
	if(pattern.test(tmp)){
        m3u8list.push(details.url);
        filename.push(tmp.slice(tmp.lastIndexOf("/")+1,tmp.length));
    }
}, {urls: ["<all_urls>"]},["extraHeaders"]);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	if(request.cmd == 'm3u8' && request.value == 'popup'){
        var resp = {m3u8list:m3u8list,filename:filename};
        sendResponse(resp);
    }
});