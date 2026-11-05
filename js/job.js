/* job.js – job.html (single job details, e.g. job.html?id=2) */

function render() {
  const id = new URLSearchParams(location.search).get("id");
  const j = jobById(id);
  const root = document.getElementById("job-root");

  if (!j) {
    root.innerHTML = `<div class="card"><h1>Job not found</h1><p class="mut">This job may have been removed.</p><a class="btn" href="jobs.html">Browse all jobs</a></div>`;
    return;
  }

  const similar = allJobs()
    .filter(x => x.id !== j.id)
    .sort((a, b) => (b.cat === j.cat) - (a.cat === j.cat))
    .slice(0, 2);

  document.title = j.t + " – " + j.c + " | Rony";

  root.innerHTML = `
  <div class="card"><div class="row" style="gap:16px">${logo(j.c, j.id)}
    <div style="flex:1"><h1 style="margin:0">${esc(j.t)}</h1><div class="mut">${esc(j.c)} · ${esc(j.l)} · ${esc(j.ty)}</div></div>
    <button class="btn" id="applyBtn">Apply now</button></div></div>

  <div class="grid g2" style="margin-top:16px;grid-template-columns:2fr 1fr">
    <div class="card"><h2>About the role</h2>
      <p>Join ${esc(j.c)} and help build products used by millions. You will collaborate with a friendly cross-functional team, own meaningful projects and grow quickly.</p>
      <h2>Requirements</h2>
      <ul>${j.tg.map(t => `<li>Hands-on experience with ${esc(t)}</li>`).join("")}<li>Strong communication and teamwork</li><li>2+ years of relevant experience</li></ul>
      <h2>Benefits</h2><p>Health insurance · Flexible hours · Learning budget · Paid leave</p></div>
    <div class="card"><h3>Job overview</h3>
      <p class="mut">Salary</p><b>${esc(j.s)}</b>
      <p class="mut">Category</p><b>${esc(j.cat)}</b>
      <p class="mut">Location</p><b>${esc(j.l)}</b>
      <p class="mut">Posted</p><b>3 days ago</b><br><br>
      <button class="btn o" data-save="${j.id}">${isSaved(j.id) ? "★ Saved" : "☆ Save job"}</button></div>
  </div>

  <h2 class="sec">Similar jobs</h2>
  <div class="grid g2">${similar.map(jobCard).join("")}</div>`;

  document.getElementById("applyBtn").addEventListener("click", () => {
    applyTo(j.id);
    toast("✔ Application submitted!");
    setTimeout(() => location.href = "applications.html", 900);
  });
}
