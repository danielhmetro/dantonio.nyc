$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const path = urlParams.get('path');
    $("#win_wid_error_path").text(path);
    const caller = urlParams.get('caller');
    $(".win_wid_error_close").click(function() {
        if (caller == 'run') {
            programOpen(false, 'Run', "/system/programs/run/?path=" + path, false, false, 340, 158);
            programClose();
        }
        if (caller == '404') {
            programOpen(false, 'Welcome', '/system/programs/welcome/', false, false, 510, 350);
            programClose();
        }
    });
});
