$(document).ready(function() {
	$("#win_welcome_code").click(function() {
		window.open("https://github.com/danielhmetro/dantonio.tech", '_blank').focus();
	});
	$("#win_welcome_new").click(function() {
		window.open("https://mastodon.nycmesh.net/@admin", '_blank').focus();
	});
	$("#win_welcome_next").click(function() {
		alert("next");
	});
	$("#win_welcome_close").click(function() {
		programClose();
	});
});
