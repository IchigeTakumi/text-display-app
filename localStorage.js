document.addEventListener("DOMContentLoaded", () => {
    // タブIDの取得
    const tabId = sessionStorage.getItem("tabId") || Date.now().toString();
    sessionStorage.setItem("tabId", tabId);

    // 保存済みデータの復元（タブIDに基づく）
    const savedText = localStorage.getItem(`textInput_${tabId}`);
    const savedCharCount = localStorage.getItem(`charCount_${tabId}`);
    const savedInterval = localStorage.getItem(`interval_${tabId}`);
    const savedDisplay = localStorage.getItem(`displayText_${tabId}`);

    if (savedText !== null) {
        document.getElementById("textInput").value = savedText;
    }
    if (savedCharCount !== null) {
        document.getElementById("charCount").value = savedCharCount;
    }
    if (savedInterval !== null) {
        document.getElementById("interval").value = savedInterval;
    }
    if (savedDisplay !== null) {
        document.getElementById("display").textContent = savedDisplay;
    }
});

// 入力値を保存（タブIDごとに保存）
document.getElementById("textInput").addEventListener("input", () => {
    const tabId = sessionStorage.getItem("tabId");
    localStorage.setItem(`textInput_${tabId}`, document.getElementById("textInput").value);
});

document.getElementById("charCount").addEventListener("input", () => {
    const tabId = sessionStorage.getItem("tabId");
    localStorage.setItem(`charCount_${tabId}`, document.getElementById("charCount").value);
});

document.getElementById("interval").addEventListener("input", () => {
    const tabId = sessionStorage.getItem("tabId");
    localStorage.setItem(`interval_${tabId}`, document.getElementById("interval").value);
});

// 表示内容を保存
function saveDisplayContent(content) {
    const tabId = sessionStorage.getItem("tabId");
    localStorage.setItem(`displayText_${tabId}`, content);
}

// 停止時にタブIDごとのデータを削除
document.getElementById("stopButton").addEventListener("click", () => {
    const tabId = sessionStorage.getItem("tabId");
    localStorage.removeItem(`textInput_${tabId}`);
    localStorage.removeItem(`charCount_${tabId}`);
    localStorage.removeItem(`interval_${tabId}`);
    localStorage.removeItem(`displayText_${tabId}`);
});
