/* jobs.js – jobs.html (search + filters) */

const params = new URLSearchParams(location.search);
let q  = params.get("q") || "";
let cf = params.get("cat") || "All";
let tf = "All types";

const qInput = document.getElementById("sq");
const catSel = document.getElementById("catSel");
const typeSel = document.getElementById("typeSel");

// fill the filter controls
qInput.value = q;
["All"].concat(CATEGORIES).forEach(c => catSel.add(new Option(c, c, false, c === cf)));
["All types", "Full-time", "Contract", "Internship"].forEach(c => typeSel.add(new Option(c, c)));

function filtered() {
  return allJobs().filter(j =>
    (cf === "All" || j.cat === cf) &&
    (tf === "All types" || j.ty === tf) &&
    (j.t + j.c + j.l + j.tg.join()).toLowerCase().includes(q.toLowerCase()));
}

function render() {
  const r = filtered();
  document.getElementById("cnt").textContent = r.length + " jobs found";
  document.getElementById("list").innerHTML = r.length
    ? r.map(jobCard).join("")
    : `<div class="card mut">No jobs match your search.</div>`;
}

qInput.addEventListener("input", () => { q = qInput.value; render(); });
catSel.addEventListener("change", () => { cf = catSel.value; render(); });
typeSel.addEventListener("change", () => { tf = typeSel.value; render(); });
