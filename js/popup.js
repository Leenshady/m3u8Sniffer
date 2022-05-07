$(function(){
    //获取background,方便访问background的变量
    var bg = chrome.extension.getBackgroundPage();
    chrome.tabs.getSelected(null, function (tab) { // 先获取当前页面的tabID
        var tabID = tab.id;
        //console.log(tabID)
        //判空
        if(bg.tabs==undefined || bg.tabs[tabID]==undefined || bg.tabs[tabID].m3u8list==undefined){
            $(".alert-warning").addClass("show")
            $(".alert-warning").removeAttr("hidden")
        }else{
            for(i=0;i<bg.tabs[tabID].m3u8list.length;i++){
                $("#box").append('<div id="url'+i+'" style="mt-1 mb-1"><span style="max-width: 200px;white-space: nowrap;display: inline-block;overflow: hidden;text-overflow: ellipsis;line-height: 1.5;">'+bg.tabs[tabID].m3u8list[i].name+'</span><a href="#" style="float: right;">复制</a></div>');
                $("#url"+i).click({"url":bg.tabs[tabID].m3u8list[i].url},copyUrl);
            }
        }
     });
})

//复制链接到剪切板
function copyUrl(obj) {
    navigator.clipboard.writeText(obj.data.url);
    $(".alert-success").addClass("show")
    $(".alert-success").removeAttr("hidden")
    window.setTimeout(function(){
        $(".alert-success").removeClass("show")
        $(".alert-success").attr("hidden","hidden")
    },2000);//2秒后消失
}
