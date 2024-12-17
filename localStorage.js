document.addEventListener("DOMContentLoaded", () => {
    // 保存済みデータの復元
    const savedText = localStorage.getItem("textInput");
    const savedCharCount = localStorage.getItem("charCount");
    const savedInterval = localStorage.getItem("interval");
    const savedDisplay = localStorage.getItem("displayText"); // 表示内容を復元

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
        document.getElementById("display").textContent = savedDisplay; // 表示内容を反映
    }
});

// 入力値を保存
document.getElementById("textInput").addEventListener("input", () => {
    localStorage.setItem("textInput", document.getElementById("textInput").value);
});

document.getElementById("charCount").addEventListener("input", () => {
    localStorage.setItem("charCount", document.getElementById("charCount").value);
});

document.getElementById("interval").addEventListener("input", () => {
    localStorage.setItem("interval", document.getElementById("interval").value);
});

// 表示内容を保存
function saveDisplayContent(content) {
    localStorage.setItem("displayText", content);
}

// 停止時にローカルストレージをクリア
document.getElementById("stopButton").addEventListener("click", () => {
    localStorage.removeItem("textInput");
    localStorage.removeItem("charCount");
    localStorage.removeItem("interval");
    localStorage.removeItem("displayText"); // 表示内容を削除
});
