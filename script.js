let isRunning = false;
let isPaused = false;
let index = 0;
let timeoutId;

const textInput = document.getElementById("textInput");
const charCountInput = document.getElementById("charCount");
const intervalInput = document.getElementById("interval");
const display = document.getElementById("display");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");

function startDisplay() {
    if (isRunning) return;

    isRunning = true;
    isPaused = false;
    index = 0;
    display.textContent = "";
    startButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;

    const text = textInput.value;
    const charCount = parseInt(charCountInput.value, 10);
    const interval = parseFloat(intervalInput.value) * 1000;

    function updateDisplay() {
        if (!isRunning) return;

        if (isPaused) {
            timeoutId = setTimeout(updateDisplay, 100); // 再開待ち
            return;
        }

        if (index < text.length) {
            display.textContent = text.slice(index, index + charCount);
            index += charCount;
            timeoutId = setTimeout(updateDisplay, interval);
        } else {
            stopDisplay(); // 表示完了で停止
        }
    }

    updateDisplay();
}

function pauseDisplay() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "再開" : "一時停止";
}

function stopDisplay() {
    isRunning = false;
    isPaused = false;
    index = 0;
    display.textContent = "";
    clearTimeout(timeoutId);

    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    pauseButton.textContent = "一時停止";
}

startButton.addEventListener("click", startDisplay);
pauseButton.addEventListener("click", pauseDisplay);
stopButton.addEventListener("click", stopDisplay);
