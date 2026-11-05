/* dashboard.js – dashboard.html */

function render() {
  document.getElementById("welcome-name").textContent = user || "Rony";

  const stats = [
    ["Applications", apps.length + 20, "+3 this week"],
    ["Interviews", 3, "1 tomorrow"],
    ["Saved jobs", saved.length, "in your list"],
    ["Profile views", 248, "+18%"]
  ];
  document.getElementById("dash-stats").innerHTML = stats.map((s, i) => `
    <div class="card"><div class="mut">${s[0]}</div>
      <div class="stat" style="color:${COLORS[i]}">${s[1]}</div>
      <div class="tag ok">${s[2]}</div></div>`).join("");

  // chart: applications this week
  const w = [4, 7, 5, 9, 12, 8, 14], m = Math.max(...w);
  document.getElementById("chart").innerHTML =
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c3aed"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs>` +
    w.map((v, i) => `
      <rect x="${14 + i * 48}" y="${130 - v / m * 110}" width="30" height="${v / m * 110}" rx="6" fill="url(#g)"/>
      <text x="${29 + i * 48}" y="150" text-anchor="middle" font-size="11" fill="var(--mut)">${"MTWTFSS"[i]}</text>
      <text x="${29 + i * 48}" y="${124 - v / m * 110}" text-anchor="middle" font-size="11" fill="var(--tx)">${v}</text>`).join("");

  // recommended jobs
  document.getElementById("recommended").innerHTML = DEFAULT_JOBS.slice(4, 7).map(jobCard).join("");
}
