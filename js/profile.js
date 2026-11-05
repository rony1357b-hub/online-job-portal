/* profile.js – profile.html */

document.getElementById("pname").textContent = user || "Rony";
document.getElementById("dlResume").addEventListener("click", () => toast("Resume download started"));
document.getElementById("contactBtn").addEventListener("click", () => toast("Message sent to Rony"));
