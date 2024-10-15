/* Start Menu Function */
$(document).ready(function() {
	$( "#win_start_button" ).click(function(){
		$( "#win_start" ).toggle(0, function(){
				$( ".win_titlebar" ).toggleClass( "win_titb_start" );
				$( ".win_tb_button" ).toggleClass( "win_tb_button_start" );
				$( "#win_start_button" ).toggleClass( "win_start_button_depressed" );
                        // CLOSE START MENU BY CLICKING OUTSIDE OF START MENU
                        $(document).click(function(e) {
                                var target = e.target;
                                if ($(target).is('#win_start,#win_start_button') || $(target).parents().is('#win_start,#win_start_button')) {
                                } else {
                                        $( "#win_start" ).hide(0, function(){
                                        $( ".win_titlebar" ).removeClass( "win_titb_start" );
                                        $( ".win_tb_button" ).removeClass( "win_tb_button_start" );
                                        $( "#win_start_button" ).removeClass( "win_start_button_depressed" );
                                        });
                                }
                        });
                });
        });

	// LOAD PROGRAMS SUBITEMS
	var programsButton = $('#win_start_tli_programs')
	var documentsButton = $('#win_start_tli_documents')
	var programsSettings = $('#win_start_tli_settings')
	var programsFind = $('#win_start_tli_find')
	var programsHelp = $('#win_start_menu_help');
	var programsRun = $('#win_start_tli_run')
	var programsShutdown = $('#win_start_tli_shutdown')

	var programsMenu = $('#win_start_menu_programs');
        var documentsMenu = $('#win_start_menu_documents');

	fetch('/programs')
	.then(response => response.json())
	.then(data => {
		data.forEach(function(item) {
			programsMenu.append("<div onclick='menuProgram(this)'>" + item.name +  "</div>");
		});
	});

	// HOVER PROGRAMS
	var hoverTimeout;

	programsButton.mouseenter(function() {
		clearTimeout(hoverTimeout);
		$(".win_start_menu").removeClass('show');
                programsMenu.css({ left: 170, top: programsButton.offset().top });

		// Set a new timeout to create the second div after 3 seconds
		hoverTimeout = setTimeout(function() {
			//programsMenu.show();
			programsMenu.addClass('show');
		},400)
	});
        documentsButton.mouseenter(function() {
                clearTimeout(hoverTimeout);
		$(".win_start_menu").removeClass('show');
                documentsMenu.css({ left: 170, top: documentsButton.offset().top });
                
		hoverTimeout = setTimeout(function() {
			documentsMenu.addClass('show');
		},400)
        });
        (function() {
                var windowWidth = window.innerWidth;
                var width = windowWidth < 700 ? windowWidth - 8 : 700;
                $('#win_start_menu_documents_documents').click(function() {
                        makeWindow("/system/icons/documents24.png", "My Documents", "/system/programs/documents", true, true, width, 600);
                        $(".win_start_menu").removeClass('show');
                        startClose();
                });
                
                $('#win_start_menu_documents_music').click(function() {
                        makeWindow("/system/icons/music.png", "My Music", "/system/programs/music", true, true, width, 475);
                        $(".win_start_menu").removeClass('show');
                        startClose();
                });
        })();
	programsSettings.mouseenter(function() {
		clearTimeout(hoverTimeout);
		$(".win_start_menu").removeClass('show');
	});
        programsSettings.click(function() {
                var windowWidth = window.innerWidth;
                var width = windowWidth < 700 ? windowWidth - 8 : 700;
		makeWindow("/system/icons/beizer.png", "Windows Task Manager", "/system/programs/taskmgr", true, true, 445, 600);
                startClose();
        });
	programsFind.mouseenter(function() {
                clearTimeout(hoverTimeout);
		$(".win_start_menu").removeClass('show');
        });
	programsFind.click(function() {
                var windowWidth = window.innerWidth;
                var width = windowWidth < 700 ? windowWidth - 8 : 700;
		// makeWindow(false, "Documents", "/system/programs/winver", true, true, width, 600);
		makeWindow(false, "Contact Daniel", "/system/programs/winver", false, false, 350, 250);
                startClose();
        });
	programsHelp.mouseenter(function() {
                clearTimeout(hoverTimeout);
		$(".win_start_menu").removeClass('show');
        });
	programsRun.mouseenter(function() {
                clearTimeout(hoverTimeout);
		$(".win_start_menu").removeClass('show');
        });
	programsRun.click(function() {
		windowBottomLeft(makeWindow(false, 'Run', "/system/programs/run", false, false, 340, 158));
                startClose();
        });
	programsShutdown.mouseenter(function() {
                clearTimeout(hoverTimeout);
		$(".win_start_menu").removeClass('show');
        });
	programsShutdown.click(function() {
                location.reload();
        });
});

// LAUNCH PROGRAM FROM MENU
function menuProgram(clickedElement) {
    $(clickedElement).parent().removeClass('show');
    var textContent = $(clickedElement).text();
    var windowWidth = window.innerWidth;
    var width = windowWidth < 700 ? windowWidth - 8 : 700;
    if (textContent == "minesweeper") {
        makeWindow(false, textContent, "/programs/" + textContent + "/", true, true, 248, 339);
    } else {
        makeWindow(false, textContent, "/programs/" + textContent + "/", true, true, width, 600);
    }
}

function startClose() {
        $( "#win_start" ).hide(0, function(){
                $( ".win_titlebar" ).removeClass( "win_titb_start" );
                $( ".win_tb_button" ).removeClass( "win_tb_button_start" );
                $( "#win_start_button" ).removeClass( "win_start_button_depressed" );
        });
}
