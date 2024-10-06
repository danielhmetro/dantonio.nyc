# dantonio.tech
A Windows 95 experience written in HTML5. (forked and inspired by [Windows95-HTML](https://github.com/rn10950/Windows95-HTML))

## Why?
For a while I wanted to create a web-based shell for running real programs in the browser, similar to [Citrix XenApp](https://www.techtarget.com/searchvirtualdesktop/definition/Citrix-XenApp). My first attempt at this was [Extensible-VNC](https://github.com/danielhmetro/Extensible-VNC) but the licensing of RealVNC is fairly restrictive and I was not virtualizing Windows at the time. I then was considering the [Internet Archive's method](https://help.archive.org/help/ms-dos-emulation/) of virtualizing DOS apps and games when I stumbled upon the above project, and thought to build my website using this as a starting point, and using a reverse proxy to mirror any virtualized services on my other servers.

## Structure

### Programs
Status: done ✅
The Programs sub-menu in the start menu is populated using custom Apache Indexes and outputing the directory index as JSON. This allows for every program to be easily added with its own "libraries" (html, css, js), or to use the proxy module to transparently serve some other server in the LAN.

#### mesh_grafana
This is a reverse proxy embed of the [NYC Mesh](https://nycmesh.net/) Grafana which shows statistics on a number of different radios and services used to power the Mesh network.

#### minesweeper
This is a fork of nickarocho's [Minesweeper](https://github.com/nickarocho/minesweeper), modified such that it fits within a window inside the "operating system". Honestly a way better rendition of minesweeper that I could ever do myself and is honestly what makes this website whole.

#### nyckml
This is a KML generator that allows you to visualize the line-of-sight between two NYC rooftops using Google Earth. Handly for installing antennas in the mesh. You can read up more about its function [here](https://github.com/danielhmetro/nyckml).

#### music
Status: 💥
What I want this to be is a viewer of all the last-played songs from my NextCloud playlist (so people can look at what music I have been listening to [I tend not use commercial streaming services anymore]) but it has been quite a pain due to the fact that 1) Subsonic (the music provider backend that the Music [app](https://github.com/owncloud/music/) provides) does not expose this very well (or that I haven't spent time disecting the protocol to get this information) and 2) my planned method to use a PHP backend to use inotify to see when files were being opened using the filesystem has been literally the worst experience ever...ok I am dying just remembering what a disaster that was so yeah it will remain broken until I have a better plan.

### Documents
Status: mostly there ☑️
This where my projects, resume, and other information are. It connects to my NextCloud server using WebDAV with a public share. Ideally, clicking on files would open up some context-aware file viewer as a window inside the "operating system" but for now, it will trigger a file download as a blob.

### Servers
Status: done ✅
While Windows 95 would have this named as "Settings", there is not a strong need for a Control Panel in my website at the moment. Thus, I built "Windows Task Manager"! It pulls statistics from [Telegraf](https://github.com/influxdata/telegraf) which runs of each of my three servers (Pallas-a Ubiquiti CloudKey Gen2, Tortoise-a Dell Optiplex 640, Porpoise-a HP EliteDesk 800 G1 TWR). Should I have things to control from my website one day, I will move Windows Task Manager to a submenu of this file.

### Contact
Status: done(?) ✅
While Windows 95 would have this named as "Find", I do not really need to implement a search function in my website. Thus, I made a "winver" dialog box that has an "acknowledgements" type thing that has my contact info. Not really sure if I want to implement a newsletter at this point in my life, TBD on that.

### Help
Status: not started 📴
This will probably be this file, along with other server-related information.

### Run
Status: done-ish ☑️
This mostly existed in the original project, just fixed the error handling to make 404 work natively. It opens any application in either the /programs or /system/programs path, but unfortunately the way that the makeWindow() function works, it has no idea what dimensions the window that it opens should be (so dialog boxes in the /systems/programs path all open with a wonky size).

## TODO
- MS-DOS Prompt (low-permissions terminal? seems like a bad idea)
- Continue to improve mobile window handling (maybe make windows always full screen on mobile?)
- Some type of gallery for my photography endeavors
- A place for my mentions in the news/press/media (could just be a folder in Documents)