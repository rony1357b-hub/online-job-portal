/* home.js – index.html */

// Featured jobs (first 4 by default order)
function render() {
  document.getElementById("featured").innerHTML = DEFAULT_JOBS.slice(0, 4).map(jobCard).join("");
}

// Hero search -> jobs.html?q=...
function heroSearch() {
  const q = document.getElementById("hq").value.trim();
  location.href = "jobs.html" + (q ? "?q=" + encodeURIComponent(q) : "");
}
document.getElementById("heroSearchBtn").addEventListener("click", heroSearch);
document.getElementById("hq").addEventListener("keydown", e => { if (e.key === "Enter") heroSearch(); });
