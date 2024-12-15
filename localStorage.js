document.addEventListener("DOMContentLoaded", () => {
    // ページ読み込み時に保存済みデータを復元
    const savedText = localStorage.getItem("textInput");
    const savedCharCount = localStorage.getItem("charCount");
    const savedInterval = localStorage.getItem("interval");

    if (savedText !== null) {
        document.getElementById("textInput").value = savedText;
    }
    if (savedCharCount !== null) {
        document.getElementById("charCount").value = savedCharCount;
    }
    if (savedInterval !== null) {
        document.getElementById("interval").value = savedInterval;
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

// 停止時にローカルストレージをクリア（必要なら追加）
document.getElementById("stopButton").addEventListener("click", () => {
    localStorage.removeItem("textInput");
    localStorage.removeItem("charCount");
    localStorage.removeItem("interval");
});
