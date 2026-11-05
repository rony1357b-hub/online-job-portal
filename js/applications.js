/* applications.js – applications.html */

function render() {
  const rows = apps.map(a => {
    const j = jobById(a.id);
    if (!j) return "";
    const cls = a.st === "Offer" ? "ok" : a.st === "Interview" ? "p" : "w";
    return `<tr><td><b>${esc(j.t)}</b></td><td>${esc(j.c)}</td><td>${esc(a.d)}</td><td><span class="tag ${cls}">${esc(a.st)}</span></td></tr>`;
  }).join("");
  document.getElementById("app-rows").innerHTML = rows;

  const savedJobs = saved.map(jobById).filter(Boolean);
  document.getElementById("saved-list").innerHTML =
    savedJobs.map(jobCard).join("") || '<div class="card mut">Nothing saved yet.</div>';
}
