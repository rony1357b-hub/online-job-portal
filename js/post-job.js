/* post-job.js – post-job.html */

document.getElementById("publishBtn").addEventListener("click", () => {
  const g = id => document.getElementById(id).value.trim();
  if (!g("pt") || !g("pc")) return toast("Please add title and company");

  addJob({
    t: g("pt"),
    c: g("pc"),
    l: g("pl") || "Remote",
    ty: "Full-time",
    s: g("ps") || "Negotiable",
    cat: g("pk"),
    tg: (g("pg") || "Teamwork").split(",").map(s => s.trim()).filter(Boolean)
  });

  toast("✔ Job published!");
  setTimeout(() => location.href = "jobs.html", 900);
});
