$(document).ready(function(){
//	if (typeof errorUri !== 'undefined') {
	var path = window.location.pathname.replace(/\//,'');
	if (window.performance.getEntries()[0].responseStatus != 200) {
		makeWindow(false, path, "/system/programs/error/?caller=404&path=" + path, false, false, 500, 160)
	} else {
                makeWindow(false, 'Welcome', '/system/programs/welcome/', false, false, 510, 350);
		//makeWindow(false, 'Welcome to Windows', '/system/programs/logon/', false, false, 480, 185);
	}
});
