function programOpen(icon, title, frameurl, taskbar, res, wid, hei) {
    parent.makeWindow(icon, title, frameurl, taskbar, res, wid, hei)
}

function programClose(button) {
    var iframe = window.frameElement;
    var winWindow = iframe.closest('.win_window');
    var winID = winWindow.id.split("window_")[1]
    console.log("Program called close function for Window " + winID);
    $(iframe.parentElement).detach();
}
