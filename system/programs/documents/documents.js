document.addEventListener('DOMContentLoaded', () => {
    fetchFiles('');
});

const publicWebDAVUrl = '/system/libraries/cloud/';
const shareToken = 'LyqymZjFcQZPLEf';

function fetchFiles(subPath) {
    const fullPath = publicWebDAVUrl + subPath;
    fetch(fullPath, {
        method: 'PROPFIND',
        headers: {
            'Depth': '1',
            'Authorization': 'Basic ' + btoa(shareToken + ':' + ' ')
        },
    })
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const fileGrid = document.getElementById('fileGrid');
        fileGrid.innerHTML = ''; // Clear current contents

        // Add parent folder link if not at root
        if (subPath && subPath !== '') {
            // Trim any trailing slashes from subPath for correct parent path calculation
            const trimmedPath = subPath.endsWith('/') ? subPath.slice(0, -1) : subPath;
        
            // Calculate parentPath
            const parentPath = trimmedPath.substring(0, trimmedPath.lastIndexOf('/'));
        
            // Ensure parentPath is empty if no parent exists (root level)
            const finalParentPath = parentPath === '' ? '' : parentPath;
        
            console.log('subPath:', subPath);
            console.log('parentPath:', finalParentPath);
        
            // Create the parent directory item
            const parentDiv = document.createElement('div');
            parentDiv.classList.add('item');
            const img = document.createElement('img');
            img.src = 'opened.png'; // Use opened.png for parent folder link
            img.alt = 'Parent Folder';
            parentDiv.appendChild(img);
        
            const span = document.createElement('span');
            span.textContent = '..';
            parentDiv.appendChild(span);
        
            parentDiv.addEventListener('click', () => {
                fetchFiles(finalParentPath); // Load parent folder
            });
        
            fileGrid.appendChild(parentDiv);
        }

        const responses = Array.prototype.slice.call(xmlDoc.querySelectorAll('d\\:response, response'), 1);

        responses.forEach(response => {
            const href = response.querySelector('d\\:href, href').textContent;
            const displayName = decodeURIComponent(href.split('/').filter(part => part).pop());
            const isDirectory = href.endsWith('/');
            let imgSrc;

            if (isDirectory) {
                imgSrc = 'folder.png';
            } else if (displayName.endsWith('.md')) {
                imgSrc = 'notepad.png';
            } else if (displayName.endsWith('.pdf')) {
                imgSrc = 'wordpad.png';
            } else {
                imgSrc = 'file.png'; // Default icon for other file types
            }

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = isDirectory ? 'Folder' : 'File';
            itemDiv.appendChild(img);

            const span = document.createElement('span');
            span.textContent = displayName;
            itemDiv.appendChild(span);

            if (isDirectory) {
                itemDiv.addEventListener('click', () => {
                    const relativePath = href.replace(publicWebDAVUrl, '').replace('/public.php/webdav/', '');
                    fetchFiles(relativePath); // Load contents of the clicked folder
                });
            } else {
                itemDiv.addEventListener('click', () => {
                    const filePath = href.replace(publicWebDAVUrl, '').replace('/public.php/webdav/', '');
                    downloadFile(filePath, displayName);
                });
            }

            fileGrid.appendChild(itemDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching files:', error);
    });
}

function downloadFile(fileUrl, fileName) {
    fetch(publicWebDAVUrl + fileUrl, {
        headers: {
            'Authorization': 'Basic ' + btoa(shareToken + ':' + ' ')
        },
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error downloading file:', error);
    });
}