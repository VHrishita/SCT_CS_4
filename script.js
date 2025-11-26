const inputBox = document.getElementById("inputBox");
const logDisplay = document.getElementById("logDisplay");
const status = document.getElementById("status");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");

let logs = JSON.parse(localStorage.getItem("logs")) || [];
showLogs();

inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let text = inputBox.value.trim();
        if (text !== "") {
            let timestamp = new Date().toLocaleString();
            logs.push(`[${timestamp}] ${text}`);
            localStorage.setItem("logs", JSON.stringify(logs));
            showLogs();
            inputBox.value = "";
            status.innerText = "Logged!";
            setTimeout(() => status.innerText = "", 700);
        }
    }
});

function showLogs() {
    logDisplay.innerHTML = logs.length
        ? logs.join("<br>")
        : "No logs yet...";
}

// 🔹 CLEAR LOGS
clearBtn.addEventListener("click", () => {
    if (confirm("Clear all logs?")) {
        logs = [];
        localStorage.removeItem("logs");
        showLogs();
    }
});

// 🔹 DOWNLOAD LOGS AS TXT
downloadBtn.addEventListener("click", () => {
    if (!logs.length) {
        alert("No logs to download");
        return;
    }
    let blob = new Blob([logs.join("\n")], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "logged_keys.txt";
    a.click();
    URL.revokeObjectURL(url);
});
