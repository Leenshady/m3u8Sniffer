var tabID;
$(function(){
    var bg = chrome.extension.getBackgroundPage();
    chrome.tabs.getSelected(null, function (tab) { // 先获取当前页面的tabID
        tabID = tab.id;
        console.log(tabID)
        for(i=0;i<bg.tabs[tabID].filename.length;i++){
            $("#box").append('<div id=url'+i+' style="width: 250px;margin-top: 5px;"><span style="width: 200px;">'+bg.tabs[tabID].filename[i]+'</span><a href="#" style="float: right;">复制</a></div>');
            $("#url"+i).click({"url":bg.tabs[tabID].m3u8list[i]},copyUrl);
        }
     });
})

function copyUrl(obj){
    var oInput = document.createElement('input');
    oInput.value = obj.data.url;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display='none';
    alert('复制成功');
}
