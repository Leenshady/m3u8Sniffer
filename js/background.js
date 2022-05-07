var tabs={};
var pattern = /http[s]?[://]{1}[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]*.m3u8$/
//拦截网络请求
chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    var tmp;
    //去除url中的参数
    if(/\?/.test(details.url)){
        tmp = details.url.slice(0,details.url.indexOf("?"));
    }else{
        tmp = details.url;
    }
    //console.log(details.url);
    //console.log(tmp);
    //匹配m3u8链接
	if(pattern.test(tmp)){
        //console.log(details.tabId);
        //如果tabs[tabId]不存在，先新建
        if(!(details.tabId in tabs)){
            tabs[details.tabId] ={};
            tabs[details.tabId].m3u8list=[];
        }
        //插入数组
        var m3u8 = {name:tmp.slice(tmp.lastIndexOf("/")+1,tmp.length),url:details.url}
        //去重
        if(!tabs[details.tabId].m3u8list.some(item=>item.url===details.url)){
            tabs[details.tabId].m3u8list.push(m3u8);
        }
        //tabs[details.tabId].filename.push(tmp.slice(tmp.lastIndexOf("/")+1,tmp.length));
    }
}, {urls: ["<all_urls>"]},["requestHeaders"]);