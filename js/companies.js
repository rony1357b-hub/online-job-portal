/* companies.js – companies.html */

function render() {
  document.getElementById("company-grid").innerHTML = allJobs().map(j => `
    <div class="card">${banner(j.id)}
      <div class="row">${logo(j.c, j.id)}<div><h3>${esc(j.c)}</h3><div class="mut">${esc(j.l)} · ${esc(j.cat)}</div></div></div>
      <p class="mut">★ ${(4 + ((j.id * 7) % 10) / 10).toFixed(1)} rating · ${50 + j.id * 140} employees</p>
      <a class="btn o" href="jobs.html?q=${encodeURIComponent(j.c)}">View openings</a>
    </div>`).join("");
}
