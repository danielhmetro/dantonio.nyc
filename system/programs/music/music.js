const musicUrl = '/metrics/music';
let musicData = [];
let sortDirections = [true, true, true]; // true for ascending, false for descending

async function fetchMusicData() {
    try {
        const response = await fetch(musicUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        musicData = await response.json();
        renderMusicTable();
    } catch (error) {
        console.error('Failed to fetch music data:', error);
    }
}

function formatDateTime(dateString) {
    // Split the date string into its parts
    const [day, month, year, hour, minute, second, offset] = dateString.split(/\/|:| /);
    const months = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    // Create a new Date object using the parsed parts
    const date = new Date(
        Date.UTC(
            parseInt(year),
            months[month],
            parseInt(day),
            parseInt(hour),
            parseInt(minute),
            parseInt(second)
        )
    );
    date.setHours(date.getHours() + 4);
    // Format the date to match the desired output
    const options = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleString('en-US', options).replace(',', '');
}

function renderMusicTable() {
    const tableBody = document.getElementById('musicBody');
    tableBody.innerHTML = ''; // Clear existing rows
    musicData.forEach(item => {
        const row = document.createElement('tr');
        
        const titleCell = document.createElement('td');
        titleCell.textContent = item.title;
        row.appendChild(titleCell);

        const artistCell = document.createElement('td');
        artistCell.textContent = item.artist;
        row.appendChild(artistCell);

        const datetimeCell = document.createElement('td');
        datetimeCell.textContent = formatDateTime(item.datetime);
        row.appendChild(datetimeCell);

        row.addEventListener('click', () => {
            const query = `${item.artist} - ${item.title}`;
            const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
            window.open(url, '_blank');
        });

        tableBody.appendChild(row);
    });
}

function sortTable(columnIndex) {
    const sortKeys = ["title", "artist", "datetime"];
    const key = sortKeys[columnIndex];
    const ascending = sortDirections[columnIndex];

    musicData.sort((a, b) => {
        return ascending ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    });

    sortDirections[columnIndex] = !ascending; // Toggle sort direction for next click
    renderMusicTable();
}

document.addEventListener('DOMContentLoaded', fetchMusicData);