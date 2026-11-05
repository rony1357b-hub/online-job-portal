/* login.js – login.html */

document.getElementById("loginBtn").addEventListener("click", () => {
  setUser(document.getElementById("ln").value.trim() || "Rony");
  location.href = "dashboard.html";
});
