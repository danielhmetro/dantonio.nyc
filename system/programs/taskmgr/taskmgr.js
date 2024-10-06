// Setup for CPU and memory usage blocks (new canvases)
const cpuUsageCanvas = document.getElementById('cpuUsage').getContext('2d');
const memoryUsageCanvas = document.getElementById('memoryUsage').getContext('2d');

// Existing setup for CPU usage and memory usage line graphs
const cpuCanvas = document.getElementById('cpuUsageGraph').getContext('2d');
const memoryCanvas = document.getElementById('memoryUsageGraph').getContext('2d');

// Configuration for the graphs
const graphWidth = 400;
var graphHeight = 150;
const blockWidth = 100;
const gap = 5;          // Gap between blocks
const refreshRate = 1000; // 1 second

// Array to hold CPU and Memory data points (for history)
let cpuData = Array(graphWidth).fill(0);
let memoryData = Array(graphWidth).fill(0);

// Function to draw a graph grid
function drawGrid(context) {
    context.clearRect(0, 0, graphWidth, graphHeight);

    // Set background to black
    context.fillStyle = "black";
    context.fillRect(0, 0, graphWidth, graphHeight);

    // Draw green grid lines
    context.strokeStyle = '#008000';
    context.lineWidth = 1;

    // Vertical grid lines
    for (let x = 0; x <= graphWidth; x += 20) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, graphHeight);
        context.stroke();
    }

    // Horizontal grid lines
    for (let y = 0; y <= graphHeight; y += 20) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(graphWidth, y);
        context.stroke();
    }
}

// Function to draw CPU usage blocks horizontally in the new canvas
function drawBlocks(context, percentage) {
    graphHeight = 150;
    // Clear the canvas
    context.clearRect(0, 0, graphWidth, graphHeight);

    // Set background to black
    context.fillStyle = "black";
    context.fillRect(0, 0, graphWidth, graphHeight);

    // Calculate the height of the blocks based on the Memory percentage
    graphHeight = 110;
    const blockHeight = (percentage / 100) * graphHeight;

    // Draw the blocks (2 blocks total) stacked vertically
    for (let i = 0; i < 2; i++) {
        const xPos = 50 + i * (blockWidth + gap);
        context.fillStyle = '#00FF00'; // Green color for blocks
        //context.fillRect(xPos, graphHeight - blockHeight - 20, blockWidth, blockHeight);
        context.fillRect(xPos, graphHeight - blockHeight, blockWidth, blockHeight);
    }

    // Draw the percentage text next to the blocks
    context.fillStyle = '#00FF00'; // Green color for text
    context.font = '32px Courier';
    context.fillText(`${percentage.toFixed(0)}%`, 125, graphHeight + 30);
}

// Function to draw a graph line (for memory usage and CPU usage line graph)
function drawGraph(context, data, color) {
    graphHeight = 150;
    // Draw the grid first
    drawGrid(context);

    context.beginPath();
    context.moveTo(0, graphHeight);

    for (let i = 0; i < data.length; i++) {
        let scaledValue = graphHeight - data[i] * (graphHeight / 100); // Scale to graph height
        context.lineTo(i, scaledValue);
    }

    context.strokeStyle = color;
    context.lineWidth = 1;
    context.stroke();
}

// Function to fetch CPU and Memory usage from the Telegraf endpoint
async function fetchMetrics(endpoint) {
    try {
        // Fetch data from the endpoint
        const response = await fetch('https://dantonio.tech/metrics/'+endpoint);
        const data = await response.text(); // Expecting plain text

        // Dynamic Regex patterns to capture various metrics
        const cpuRegex = new RegExp(`cpu_usage_idle\\{cpu="cpu-total",host="${endpoint}"\\}\\s([\\d.]+)`);
        const memoryRegex = new RegExp(`mem_used_percent\\{host="${endpoint}"\\}\\s([\\d.]+)`);

        var tempRegex; // temp_temp is endpoint dependent
        const uptimeRegex = new RegExp(`system_uptime\\{host="${endpoint}"\\}\\s([\\d.e+]+)`);
        const iowaitRegex = new RegExp(`cpu_usage_iowait\\{cpu="cpu-total",host="${endpoint}"\\}\\s([\\d.]+)`);

        var diskFreeRegex; // disk_free is endpoint dependent
        var diskTotalRegex; // disk_total is endpoint dependent
        var diskUsedPercentRegex; // disk_used_percent is endpoint dependent

        const memTotalRegex = new RegExp(`mem_total\\{host="${endpoint}"\\}\\s([\\d.e+]+)`);
        const memAvailableRegex = new RegExp(`mem_available\\{host="${endpoint}"\\}\\s([\\d.e+]+)`);
        const memSwapTotalRegex = new RegExp(`mem_swap_total\\{host="${endpoint}"\\}\\s([\\d.e+]+)`);
        const memSwapFreeRegex = new RegExp(`mem_swap_free\\{host="${endpoint}"\\}\\s([\\d.e+]+)`);
        const memAvailablePercentRegex = new RegExp(`mem_available_percent\\{host="${endpoint}"\\}\\s([\\d.]+)`);
        const swapUsedPercentRegex = new RegExp(`swap_used_percent\\{host="${endpoint}"\\}\\s([\\d.]+)`);

        const processesTotalRegex = new RegExp(`processes_total\\{host="${endpoint}"\\}\\s([\\d.]+)`);
        const processesTotalThreadsRegex = new RegExp(`processes_total_threads\\{host="${endpoint}"\\}\\s([\\d.]+)`);
        const processesSleepingRegex = new RegExp(`processes_sleeping\\{host="${endpoint}"\\}\\s([\\d.]+)`);

        // Endpoint dependent metrics
        if (endpoint == "pallas") {
            tempRegex = new RegExp(`temp_temp\\{host="${endpoint}",sensor="chg_temp"\\}\\s([\\d.]+)`);
            var diskFreeRegex = new RegExp(`disk_free\\{device="mmcblk0p46",fstype="ext4",host="${endpoint}",label="overlay",mode="rw",path="\\/mnt\\/.rwfs"\\}\\s([\\d.e+]+)`);
            var diskTotalRegex = new RegExp(`disk_total\\{device="mmcblk0p46",fstype="ext4",host="${endpoint}",label="overlay",mode="rw",path="\\/mnt\\/.rwfs"\\}\\s([\\d.e+]+)`);
            var diskUsedPercentRegex = new RegExp(`disk_used_percent\\{device="mmcblk0p46",fstype="ext4",host="${endpoint}",label="overlay",mode="rw",path="\\/mnt\\/.rwfs"\\}\\s([\\d.]+)`);
        } else {
            tempRegex = new RegExp(`temp_temp\\{host="${endpoint}",sensor="coretemp_core_1"\\}\\s([\\d.]+)`);
            var diskFreeRegex = new RegExp(`disk_free\\{device="dm-1",fstype="ext4",host="${endpoint}",label="pve-root",mode="rw",path="\\/"\\}\\s([\\d.e+]+)`);
            var diskTotalRegex = new RegExp(`disk_total\\{device="dm-1",fstype="ext4",host="${endpoint}",label="pve-root",mode="rw",path="\\/"\\}\\s([\\d.e+]+)`);
            var diskUsedPercentRegex = new RegExp(`disk_used_percent\\{device="dm-1",fstype="ext4",host="${endpoint}",label="pve-root",mode="rw",path="\\/"\\}\\s([\\d.]+)`);
        }

        // Extract metrics using regex
        const cpuMatch = data.match(cpuRegex);
        const memoryMatch = data.match(memoryRegex);

        const tempMatch = data.match(tempRegex);
        const uptimeMatch = data.match(uptimeRegex);
        const iowaitMatch = data.match(iowaitRegex);

        const diskFreeMatch = data.match(diskFreeRegex);
        const diskTotalMatch = data.match(diskTotalRegex);
        const diskUsedPercentMatch = data.match(diskUsedPercentRegex);

        const memTotalMatch = data.match(memTotalRegex);
        const memAvailableMatch = data.match(memAvailableRegex);
        const memSwapTotalMatch = data.match(memSwapTotalRegex);
        const memSwapFreeMatch = data.match(memSwapFreeRegex);
        const memAvailablePercentMatch = data.match(memAvailablePercentRegex);
        const swapUsedPercentMatch = data.match(swapUsedPercentRegex);

        const processesTotalMatch = data.match(processesTotalRegex);
        const processesTotalThreadsMatch = data.match(processesTotalThreadsRegex);
        const processesSleepingMatch = data.match(processesSleepingRegex);

        // Build an object to store extracted values
        return {
            cpuUsage: cpuMatch ? 100 - parseFloat(cpuMatch[1]) : null,
            memoryUsage: memoryMatch ? parseFloat(memoryMatch[1]) : null,
            temp: tempMatch ? parseFloat(tempMatch[1]) : null,
            uptime: uptimeMatch ? parseFloat(uptimeMatch[1]) : null,
            iowait: iowaitMatch ? parseFloat(iowaitMatch[1]) : null,
            diskFree: diskFreeMatch ? parseFloat(diskFreeMatch[1]) : null,
            diskTotal: diskTotalMatch ? parseFloat(diskTotalMatch[1]) : null,
            diskUsedPercent: diskUsedPercentMatch ? parseFloat(diskUsedPercentMatch[1]) : null,
            memTotal: memTotalMatch ? parseFloat(memTotalMatch[1]) : null,
            memAvailable: memAvailableMatch ? parseFloat(memAvailableMatch[1]) : null,
            memSwapTotal: memSwapTotalMatch ? parseFloat(memSwapTotalMatch[1]) : null,
            memSwapFree: memSwapFreeMatch ? parseFloat(memSwapFreeMatch[1]) : null,
            memAvailablePercent: memAvailablePercentMatch ? parseFloat(memAvailablePercentMatch[1]) : null,
            swapUsedPercent: swapUsedPercentMatch ? 100 - parseFloat(swapUsedPercentMatch[1]) : null, // Invert swap used percent
            processesTotal: processesTotalMatch ? parseFloat(processesTotalMatch[1]) : null,
            processesTotalThreads: processesTotalThreadsMatch ? parseFloat(processesTotalThreadsMatch[1]) : null,
            processesSleeping: processesSleepingMatch ? parseFloat(processesSleepingMatch[1]) : null
        };

    } catch (error) {
        console.error('Error fetching metrics:', error);
        return null; // In case of error, return null
    }
}

// Function to update CPU and Memory usage data on the UI
async function updateUsageData(endpoint) {
    // Fetch metrics from the endpoint
    const metrics = await fetchMetrics(endpoint);

    if (metrics) {
        const { cpuUsage, memoryUsage, temp, uptime, iowait, diskFree, diskTotal, diskUsedPercent,
            memTotal, memSwapTotal, memSwapFree,
            processesTotal, processesTotalThreads, processesSleeping } = metrics;

        document.getElementById('temp_temp').textContent = temp ? `${temp.toFixed(2)}°C` : 'N/A';
        document.getElementById('system_uptime').textContent = uptime ? `${(uptime / 3600).toFixed(2)} hours` : 'N/A';
        document.getElementById('cpu_usage_iowait').textContent = iowait ? `${iowait.toFixed(2)}%` : '0.00%';

        document.getElementById('disk_free').textContent = diskFree ? `${(diskFree / (1024 ** 3)).toFixed(2)} GB` : 'N/A';
        document.getElementById('disk_total').textContent = diskTotal ? `${(diskTotal / (1024 ** 3)).toFixed(2)} GB` : 'N/A';
        document.getElementById('disk_used_percent').textContent = diskUsedPercent ? `${diskUsedPercent.toFixed(2)}%` : 'N/A';

        document.getElementById('mem_total').textContent = memTotal ? `${(memTotal / (1024 ** 3)).toFixed(2)} GB` : 'N/A';
        document.getElementById('mem_swap_total').textContent = memSwapTotal ? `${(memSwapTotal / (1024 ** 3)).toFixed(2)} GB` : 'N/A';
        document.getElementById('mem_swap_free').textContent = memSwapFree ? `${(memSwapFree / (1024 ** 3)).toFixed(2)} GB` : 'N/A';

        document.getElementById('processes_total').textContent = processesTotal ? processesTotal : 'N/A';
        document.getElementById('processes_total_threads').textContent = processesTotalThreads ? processesTotalThreads : 'N/A';
        document.getElementById('processes_sleeping').textContent = processesSleeping ? processesSleeping : 'N/A';
        
        // Shift old CPU and memory data, then add the new values
        cpuData.shift();
        cpuData.push(cpuUsage);

        memoryData.shift();
        memoryData.push(memoryUsage);

        // Draw updated CPU blocks, Memory blocks, and line graphs
        drawBlocks(cpuUsageCanvas, cpuUsage);          // CPU usage as blocks in cpuUsage canvas
        drawBlocks(memoryUsageCanvas, memoryUsage); // Memory usage as vertical blocks in memoryUsage canvas
        drawGraph(cpuCanvas, cpuData, '#00FF00');            // CPU usage as a line graph in cpuUsageGraph canvas
        drawGraph(memoryCanvas, memoryData, '#00FF00');      // Memory usage as a line graph in memoryUsageGraph canvas
    } else {
        console.error('Failed to update usage data.');
    }
}

// Update graphs at the given refresh rate
$(document).ready(function() {
    var timer = setInterval(function() {
        updateUsageData("pallas");
    }, refreshRate);
    $("#pallasButton").click(function() {
        if (timer) {
            clearTimeout(timer);
            timer = setInterval(function() {
                updateUsageData("pallas");
            }, refreshRate);
        }
        $("#pallasButton").css("padding","4px");
        $("#pallasButton").css("z-index","3");
        
        $("#tortoiseButton").css("padding","3px");

        $("#porpoiseButton").css("padding","3px");
        $("#porpoiseButton").css("z-index","1");
    })
    $("#tortoiseButton").click(function() {
        if (timer) {
            clearTimeout(timer);
            timer = setInterval(function() {
                updateUsageData("tortoise");
            }, refreshRate);
        }
        $("#pallasButton").css("padding","3px");
        $("#pallasButton").css("z-index","2");

        
        $("#tortoiseButton").css("padding","4px");

        $("#porpoiseButton").css("padding","3px");
        $("#porpoiseButton").css("z-index","1");
    });
    $("#porpoiseButton").click(function() {
        if (timer) {
            clearTimeout(timer);
            timer = setInterval(function() {
                updateUsageData("porpoise");
            }, refreshRate);
        }
        $("#pallasButton").css("padding","3px");
        $("#pallasButton").css("z-index","3");

        $("#tortoiseButton").css("padding","3px");

        $("#porpoiseButton").css("padding","4px");
        $("#porpoiseButton").css("z-index","3");
    });
});
