//	if (typeof errorUri !== 'undefined') {
/*$(document).ready(function(){
	var path = window.location.pathname.replace(/\//,'');
	if (window.performance.getEntries()[0].responseStatus != 200) {
		makeWindow(false, path, "/system/programs/error/?caller=404&path=" + path, false, false, 500, 160)
	} else {
        makeWindow(false, 'Welcome', '/system/programs/welcome/', false, false, 510, 350);
		
	}
});*/

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

    if (window.performance.getEntries()[0].responseStatus != 200) {
        makeWindow(false, path, "/system/programs/error/?caller=404&path=" + path, false, false, 500, 160);
    } else {
        makeWindow(false, 'Welcome', '/system/programs/welcome/', false, false, width, height);
    }
});

//makeWindow(false, 'Welcome to Windows', '/system/programs/logon/', false, false, 480, 185);