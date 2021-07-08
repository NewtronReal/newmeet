if (typeof browser === "undefined") {
    var browser = chrome;
}
browser.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request)
    let filename = navigator.userAgent.indexOf("Firefox") != -1 ? request.name:request.chromeName
    let blob = new Blob([request.data],{type:"text/html"});
    let url = URL.createObjectURL(blob)
    browser.downloads.download({filename:filename,url: url,saveAs:false})
})
