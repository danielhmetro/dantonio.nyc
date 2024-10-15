$(document).ready(function() {
    var path = window.location.pathname.replace(/\//, '');
    var windowWidth = window.innerWidth;
    var width, height;

    if (windowWidth < 510) {
        width = windowWidth - 8;
        height = 530;
    } else {
        width = 510;
        height = 350;
    }

    if (!window.performance.getEntries()[0].responseStatus) { // Safari does not support responseStatus
        makeWindow(false, 'Welcome', '/system/programs/welcome/', false, false, width, height);
    } else if (window.performance.getEntries()[0].responseStatus != 200) { // Assume error is 404
        makeWindow(false, path, "/system/programs/error/?caller=404&path=" + path, false, false, 500, 160);
    } else {
        makeWindow(false, 'Welcome', '/system/programs/welcome/', false, false, width, height);
    }
});