/* ===========================================================
   data.js – shared data + saved state (used by every page)
   State is kept in localStorage so it carries across pages.
   =========================================================== */

const COLORS = ["#4f46e5", "#db2777", "#0891b2", "#ea580c", "#16a34a", "#7c3aed", "#ca8a04", "#0f766e"];

// Default jobs (id is used in URLs: job.html?id=0)
const DEFAULT_JOBS = [
  { id: 0, t: "Senior Frontend Developer", c: "Nimbus Labs", l: "Bengaluru", ty: "Full-time", s: "₹22–32 LPA", cat: "Engineering", tg: ["React", "TypeScript", "CSS"] },
  { id: 1, t: "UI/UX Designer", c: "Pixelcraft", l: "Remote", ty: "Contract", s: "₹12–18 LPA", cat: "Design", tg: ["Figma", "Research", "Prototyping"] },
  { id: 2, t: "Data Analyst", c: "Insightly", l: "Hyderabad", ty: "Full-time", s: "₹8–14 LPA", cat: "Data", tg: ["SQL", "Python", "Tableau"] },
  { id: 3, t: "Digital Marketing Manager", c: "BrightWave", l: "Mumbai", ty: "Full-time", s: "₹14–20 LPA", cat: "Marketing", tg: ["SEO", "Ads", "Analytics"] },
  { id: 4, t: "Backend Engineer (Node.js)", c: "CloudNest", l: "Pune", ty: "Full-time", s: "₹18–28 LPA", cat: "Engineering", tg: ["Node.js", "AWS", "MongoDB"] },
  { id: 5, t: "HR Business Partner", c: "PeopleFirst", l: "Chennai", ty: "Full-time", s: "₹10–16 LPA", cat: "HR", tg: ["Hiring", "Policy", "Culture"] },
  { id: 6, t: "Machine Learning Intern", c: "NeuroByte", l: "Remote", ty: "Internship", s: "₹30K / month", cat: "Data", tg: ["Python", "PyTorch", "Stats"] },
  { id: 7, t: "Product Manager", c: "Orbit Pay", l: "Bengaluru", ty: "Full-time", s: "₹26–38 LPA", cat: "Product", tg: ["Roadmap", "Fintech", "Agile"] }
];

const CATEGORIES = ["Engineering", "Design", "Data", "Marketing", "HR", "Product"];

const DEFAULT_APPS = [
  { id: 0, st: "Interview", d: "2 Nov" },
  { id: 2, st: "Under review", d: "30 Oct" },
  { id: 4, st: "Applied", d: "28 Oct" },
  { id: 5, st: "Offer", d: "20 Oct" }
];

/* ---------- safe localStorage helpers ---------- */
function store(key, fallback) {
  try {
    const v = localStorage.getItem("rony_" + key);
    return v === null ? fallback : JSON.parse(v);
  } catch (err) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem("rony_" + key, JSON.stringify(value)); } catch (err) { /* ignore */ }
}

/* ---------- state ---------- */
let posted = store("posted", []);            // jobs posted by the user
let saved  = store("saved", [1, 4]);         // saved job ids
let apps   = store("apps", DEFAULT_APPS);    // applications
let user   = store("user", null);            // logged-in name

function allJobs() { return posted.concat(DEFAULT_JOBS); }
function jobById(id) { return allJobs().find(j => j.id === Number(id)); }
function isSaved(id) { return saved.includes(id); }

function toggleSave(id) {
  saved = isSaved(id) ? saved.filter(x => x !== id) : saved.concat(id);
  save("saved", saved);
}
function applyTo(id) {
  if (!apps.find(a => a.id === id)) apps.unshift({ id: id, st: "Applied", d: "Today" });
  save("apps", apps);
}
function addJob(job) {
  job.id = allJobs().reduce((m, j) => Math.max(m, j.id), 0) + 1;
  posted.unshift(job);
  save("posted", posted);
}
function setUser(name) { user = name; save("user", name); }
