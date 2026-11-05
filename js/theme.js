/* theme.js – loaded in <head> so the saved light/dark theme applies before the page paints */
try {
  var t = localStorage.getItem("rony_theme");
  if (t) document.documentElement.dataset.theme = t;
} catch (err) { /* ignore */ }
