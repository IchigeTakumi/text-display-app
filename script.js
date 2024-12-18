let isRunning = false;
let isPaused = false;
let index = 0;
let timeoutId;

// タブIDの生成と保存
const tabId = sessionStorage.getItem("tabId") || Date.now().toString();
sessionStorage.setItem("tabId", tabId);

// UI要素
const textInput = document.getElementById("textInput");
const charCountInput = document.getElementById("charCount");
const intervalInput = document.getElementById("interval");
const display = document.getElementById("display");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");

// データ保存
function saveData(key, value) {
    localStorage.setItem(`${key}_${tabId}`, value); // タブごとのIDを含めて保存
}

// データ読み込み
function loadData(key) {
    return localStorage.getItem(`${key}_${tabId}`); // タブIDに関連付けて読み込む
}

function clearData() {
    localStorage.removeItem(`textInput_${tabId}`);
    localStorage.removeItem(`charCount_${tabId}`);
    localStorage.removeItem(`interval_${tabId}`);
    localStorage.removeItem(`index_${tabId}`);
    localStorage.removeItem(`displayText_${tabId}`);
    localStorage.removeItem(`isRunning_${tabId}`);
    localStorage.removeItem(`isPaused_${tabId}`);
}

// ページ読み込み時の復元処理
document.addEventListener("DOMContentLoaded", () => {
    textInput.value = loadData("textInput") || "";
    charCountInput.value = loadData("charCount") || 5;
    intervalInput.value = loadData("interval") || 0.5;
    index = parseInt(loadData("index"), 10) || 0;

    const savedDisplay = loadData("displayText");
    if (savedDisplay) {
        display.textContent = savedDisplay;
    }

    isRunning = loadData("isRunning") === "true";
    isPaused = loadData("isPaused") === "true";

    if (isRunning) {
        startDisplay(true);
        if (isPaused) pauseDisplay();
    }
});

// テキスト逐次表示機能
function startDisplay(isResuming = false) {
    if (isRunning && !isResuming) return;

    isRunning = true;
    isPaused = false;
    startButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;

    saveData("isRunning", "true");

    const text = textInput.value;
    const charCount = parseInt(charCountInput.value, 10);
    const interval = parseFloat(intervalInput.value) * 1000;

   function updateDisplay() {
    if (!isRunning) return;

    if (isPaused) {
        timeoutId = setTimeout(updateDisplay, 100);
        return;
    }

    if (index < text.length) {
        display.textContent = text.slice(index, index + charCount);
        saveDisplayContent(display.textContent); // 表示内容を保存
        index += charCount;
        timeoutId = setTimeout(updateDisplay, interval);
    } else {
        stopDisplay();
    }
}


    updateDisplay();
}

function pauseDisplay() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "再開" : "一時停止";
    saveData("isPaused", isPaused.toString());
}

function stopDisplay() {
    isRunning = false;
    isPaused = false;
    index = 0;
    display.textContent = "";
    clearTimeout(timeoutId);
    clearData();

    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    pauseButton.textContent = "一時停止";
}

// イベントリスナー
startButton.addEventListener("click", () => startDisplay());
pauseButton.addEventListener("click", pauseDisplay);
stopButton.addEventListener("click", stopDisplay);

// 入力保存
textInput.addEventListener("input", () => saveData("textInput", textInput.value));
charCountInput.addEventListener("input", () => saveData("charCount", charCountInput.value));
intervalInput.addEventListener("input", () => saveData("interval", intervalInput.value));
