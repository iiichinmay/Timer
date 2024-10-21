let startTime;
let totalTime = 0;
let timerInterval;

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const resetButton = document.getElementById('reset');

pauseButton.disabled = true;
resumeButton.disabled = true;
resetButton.disabled = true;

function updateTimer() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const timetotal = totalTime + elapsed;

    const totalSeconds = Math.floor(timetotal / 1000);
    const milliseconds = String(timetotal % 1000).padStart(3, '0');
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    timerElement.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10); // Update every 10 milliseconds
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    localStorage.setItem('startTime', startTime);
    localStorage.setItem('totalTime', totalTime);
    localStorage.setItem('timerInterval', 'active');
}

function pauseTimer() {
    clearInterval(timerInterval);
    totalTime += Date.now() - startTime;
    pauseButton.disabled = true;
    resumeButton.disabled = false;
    localStorage.setItem('totalTime', totalTime);
    localStorage.setItem('timerInterval', 'paused');
}

function resumeTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    resumeButton.disabled = true;
    pauseButton.disabled = false;
    localStorage.setItem('startTime', startTime);
    localStorage.setItem('totalTime', totalTime);
    localStorage.setItem('timerInterval', 'active');
}

function resetTimer() {
    clearInterval(timerInterval);
    totalTime = 0;
    timerElement.textContent = "00:00:00:000";
    startButton.disabled = false;
    pauseButton.disabled = true;
    resumeButton.disabled = true;
    resetButton.disabled = true;
    localStorage.removeItem('startTime');
    localStorage.removeItem('totalTime');
    localStorage.removeItem('timerInterval');
}

function loadTimerState() {
    const savedTotalTime = localStorage.getItem('totalTime');
    const savedStartTime = localStorage.getItem('startTime');
    const savedTimerInterval = localStorage.getItem('timerInterval');

    if (savedTotalTime) {
        totalTime = parseInt(savedTotalTime, 10);
        if (savedTimerInterval === 'active') {
            startTime = parseInt(savedStartTime, 10);
            timerInterval = setInterval(updateTimer, 10);
            startButton.disabled = true;
            pauseButton.disabled = false;
            resetButton.disabled = false;
        } else {
            timerElement.textContent = formatTime(totalTime);
            startButton.disabled = false;
            pauseButton.disabled = false;
            resumeButton.disabled = false;
            resetButton.disabled = false;
        }
    } else {
        timerElement.textContent = formatTime(totalTime);
    }
}

function formatTime(timetotal) {
    const totalSeconds = Math.floor(timetotal / 1000);
    const milliseconds = String(timetotal % 1000).padStart(3, '0');
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Load the timer state on page load
window.addEventListener('load', loadTimerState);

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resumeButton.addEventListener('click', resumeTimer);
resetButton.addEventListener('click', resetTimer);

