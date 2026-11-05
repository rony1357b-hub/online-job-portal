/* ===========================================================
   common.js – helpers + effects shared by every page
   =========================================================== */

/* escape text before putting it in HTML */
const esc = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));

/* company logo square */
const logo = (company, id) =>
  `<div class="logo" style="background:${COLORS[id % 8]}">${esc(company[0])}</div>`;

/* round avatar (inline SVG) used for other members */
const avatar = (size = 44) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 44 44"><defs><linearGradient id="av" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4f46e5"/><stop offset="1" stop-color="#c026d3"/></linearGradient></defs><circle cx="22" cy="22" r="22" fill="url(#av)"/><circle cx="22" cy="17" r="7" fill="#fff" opacity=".9"/><path d="M8 38c2-9 26-9 28 0" fill="#fff" opacity=".9"/></svg>`;

/* profile photo of Rony */
const photo = (size, cls = "") =>
  `<img class="pf ${cls}" src="images/profile-small.jpg" width="${size}" height="${size}" alt="Rony profile photo">`;

/* company banner (inline SVG) */
const banner = i =>
  `<svg class="ban" viewBox="0 0 400 120" preserveAspectRatio="none"><defs><linearGradient id="b${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${COLORS[i % 8]}"/><stop offset="1" stop-color="${COLORS[(i + 3) % 8]}"/></linearGradient></defs><rect width="400" height="120" fill="url(#b${i})"/><circle cx="330" cy="30" r="60" fill="#fff" opacity=".12"/><circle cx="60" cy="110" r="50" fill="#fff" opacity=".1"/><rect x="150" y="40" width="100" height="60" rx="6" fill="#fff" opacity=".25"/><rect x="162" y="52" width="50" height="6" rx="3" fill="#fff"/><rect x="162" y="66" width="76" height="6" rx="3" fill="#fff" opacity=".7"/></svg>`;

/* job card (used on home, jobs, job details, dashboard, applications) */
const jobCard = j =>
  `<div class="card job" data-open="${j.id}">${logo(j.c, j.id)}
    <div style="flex:1"><h3>${esc(j.t)}</h3>
      <div class="mut">${esc(j.c)} · ${esc(j.l)}</div>
      <span class="tag p">${esc(j.ty)}</span><span class="tag ok">${esc(j.s)}</span>${j.tg.map(t => `<span class="tag">${esc(t)}</span>`).join("")}
    </div>
    <button class="btn o" data-save="${j.id}">${isSaved(j.id) ? "★ Saved" : "☆ Save"}</button></div>`;

/* ---------- toast ---------- */
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove("on"), 2200);
}

/* ---------- light / dark theme ---------- */
function toggleTheme() {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("rony_theme", r.dataset.theme); } catch (err) { /* ignore */ }
}

/* ---------- scroll-reveal + count-up animations ---------- */
const io = new IntersectionObserver(entries => entries.forEach(x => {
  if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); }
}), { threshold: .06 });

function countUp() {
  document.querySelectorAll(".stat").forEach(el => {
    if (el.dataset.done) return;
    const t = el.textContent, m = t.match(/^([\d,.]+)(.*)$/);
    if (!m) return;
    el.dataset.done = "1";
    const n = parseFloat(m[1].replace(/,/g, "")), comma = m[1].includes(",");
    let k = 0;
    const id = setInterval(() => {
      k += .04;
      if (k >= 1) { el.textContent = t; clearInterval(id); }
      else { const v = Math.round(n * k); el.textContent = (comma ? v.toLocaleString("en-US") : v) + m[2]; }
    }, 25);
  });
}

function effects() {
  document.querySelectorAll("main .card:not(.rv), main .hero:not(.rv), main .cta:not(.rv), main .pcover:not(.rv), main .dbn:not(.rv), main h2.sec:not(.rv)")
    .forEach((el, i) => {
      el.classList.add("rv");
      el.style.animationDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  countUp();
}

/* ---------- page start ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // login button shows the user's name
  const auth = document.getElementById("authBtn");
  if (auth && user) auth.textContent = user;

  // each page can define render() to build its dynamic content
  if (typeof render === "function") render();
  effects();
});

/* ---------- click handling for job cards / save buttons ---------- */
document.addEventListener("click", ev => {
  const s = ev.target.closest("[data-save]");
  if (s) {
    ev.stopPropagation();
    toggleSave(Number(s.dataset.save));
    if (typeof render === "function") { render(); effects(); }
    return;
  }
  const o = ev.target.closest("[data-open]");
  if (o) location.href = "job.html?id=" + o.dataset.open;
});

/* ---------- back-to-top button + progress bar ---------- */
addEventListener("scroll", () => {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  document.getElementById("up").classList.toggle("show", y > 320);
  document.getElementById("pgb").style.width = (h > 0 ? y / h * 100 : 0) + "%";
});
