// set "open" button active and inactive based on input value
$(document).ready(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('path')) {
        const path = urlParams.get('path');
        $("#win_wid_run_input").val(path);
        $( '#win_wid_run_obutton' ).removeAttr('disabled');
    }

    $( '#win_wid_run_input' ).on('input', function() {
        var tbVal = $( '#win_wid_run_input' ).val();
        if(tbVal.length > 0) { // input != empty
            $( '#win_wid_run_obutton' ).removeAttr('disabled');
        } else { // input is empty
            $( '#win_wid_run_obutton' ).prop('disabled', true);
        }
    });
})


function runOK() {
    var boxVal = $( "#win_wid_run_input" ).val();
    var command = boxVal.toLowerCase();
    const programsNormal = '/programs/' + command + "/";
    const programsSystem = '/system/programs/' + command + "/";

    fetch(programsNormal, { method: 'HEAD' }) // Use the HEAD method to only request the headers, not the full content
    .then(response => {
        if (response.ok) {
            console.log(programsNormal);
            programOpen(false, boxVal, programsNormal, true, true, 700, 600)
            programClose()
        } else {
            fetch(programsSystem, { method: 'HEAD' }) // Use the HEAD method to only request the headers, not the full content
            .then(response => {
                if (response.ok) {
                    console.log(programsSystem);
                    programOpen(false, "", programsSystem, false, false, 300, 130)
                    programClose();
                } else {
                    console.log("fail");
                    $( ".win_wid_run_dialog" ).hide();
                    programOpen(false, boxVal, "/system/programs/error/?caller=run&path=" + boxVal, false, false, 500, 160)
                    programClose();
                }
            })
            .catch(error => {
                console.error('Error during fetch operation:', error);
            });
        }
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

function runBrowse() {
    // this is just a placeholder for if/when we can browse for "executables"
}
