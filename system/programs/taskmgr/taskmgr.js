// Function to update CPU Usage percentage and progress bar
function updateCpuUsage(percentage) {
    const cpuUsageText = document.getElementById('cpu-usage');
    const cpuUsageBar = document.getElementById('cpu-usage-bar');
    cpuUsageText.textContent = `${percentage}%`;
    cpuUsageBar.style.height = `${percentage}%`;
}

// Function to update Memory Usage in GB and progress bar
function updateMemoryUsage(gb) {
    const memoryUsageText = document.getElementById('memory-usage');
    const memoryUsageBar = document.getElementById('memory-usage-bar');
    memoryUsageText.textContent = `${gb} GB`;
    memoryUsageBar.style.height = `${(gb / 16.37) * 100}%`; // Assuming 16.37 GB is the max for the progress bar
}

// Function to update Physical Memory values
function updatePhysicalMemory(total, cached, available, free) {
    document.getElementById('physical-total').textContent = total;
    document.getElementById('physical-cached').textContent = cached;
    document.getElementById('physical-available').textContent = available;
    document.getElementById('physical-free').textContent = free;
}

// Function to update Kernel Memory values
function updateKernelMemory(paged, nonPaged) {
    document.getElementById('kernel-paged').textContent = paged;
    document.getElementById('kernel-nonpaged').textContent = nonPaged;
}

// Function to update System information
function updateSystemInfo(handles, threads, processes, uptime, commit) {
    document.getElementById('system-handles').textContent = handles;
    document.getElementById('system-threads').textContent = threads;
    document.getElementById('system-processes').textContent = processes;
    document.getElementById('system-uptime').textContent = uptime;
    document.getElementById('system-commit').textContent = commit;
}

// Example usage with placeholders
updateCpuUsage(10);
updateMemoryUsage(9.91);
updatePhysicalMemory(16367, 4578, 6211, 1858);
updateKernelMemory(324, 188);
updateSystemInfo(74736, 2034, 118, '12:05:15:19', '13 / 31');
