$(document).ready(function(){
	if (typeof errorUri !== 'undefined') {
		makeWindow(false, errorUri, "/system/programs/error/?caller=404&path=" + errorUri, false, false, 500, 160)
	} else {
                makeWindow(false, 'Welcome', '/system/programs/welcome/', false, false, 510, 350);
		//makeWindow(false, 'Welcome to Windows', '/system/programs/logon/', false, false, 480, 185);
	}
});
