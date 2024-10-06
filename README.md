# dantonio.tech
A Windows 95 experience written in HTML5. (forked and inspired by [Windows95-HTML](https://github.com/rn10950/Windows95-HTML))

## Why?
For a while I wanted to create a web-based shell for running real programs in the browser, similar to [Citrix XenApp](https://www.techtarget.com/searchvirtualdesktop/definition/Citrix-XenApp). My first attempt at this was [Extensible-VNC](https://github.com/danielhmetro/Extensible-VNC) but the licensing of RealVNC is fairly restrictive and I was not virtualizing Windows at the time. I then was considering the [Internet Archive's method](https://help.archive.org/help/ms-dos-emulation/) of virtualizing DOS apps and games when I stumbled upon the above project, and thought to build my website using this as a starting point, and using a reverse proxy to mirror any virtualized services on my other servers.

## Structure

### Programs
Status: done ✅
The Programs sub-menu in the start menu is populated using nginx autoindex outputing the directory index as JSON. This allows for every program to be easily added with its own "libraries" (html, css, js), or to use the proxy module to transparently serve some other server in the LAN.

### Documents
Status: not started 📴
This will eventually be where my projects, resume, and other information will go. Still need to design explorer.exe in CSS.

### Settings
Status: no plans 🤔
Not sure what utility this will have so I may remove it.

### Find
Status: need to research 🤔
I am not sure what it will do in the scope of this app, still need to compare with actual Windows 95 behavior.

### Help
Status: not started 📴
This will probably be this file, along with other server-related information.

### Run
Status: done ✅
This mostly existed in the original project, just fixed the error handling to make 404 work natively.

## TODO
- MS-DOS Prompt
- Mastodon? (there are some challenges with the path handling)
- Windows Media Player (should link to my Nextcloud library, but need to check if this legal first. Maybe just link to the YouTube versions)
