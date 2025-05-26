const defaultCountdowns = [
  { name: "GOST Exam", date: "2025-06-24", color: "red" },
  { name: "Graduation", date: "2025-07-07", color: "green" },
  { name: "MIST", date: "2025-08-10", color: "blue" },
  { name: "FMGe", date: "2025-12-31", color: "yellow" }
];

let countdowns = [];

// Load from localStorage or fallback to defaults
function loadCountdowns() {
  const saved = localStorage.getItem("countdowns");
  countdowns = saved ? JSON.parse(saved) : defaultCountdowns;
}

// Save current countdowns to localStorage
function saveCountdowns() {
  localStorage.setItem("countdowns", JSON.stringify(countdowns));
}

function daysRemaining(targetDate) {
  const now = new Date();
  const then = new Date(targetDate);
  const diff = then - now;
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}

function getAccentColor(colorName) {
  switch (colorName.toLowerCase()) {
    case "red": return "#ff3b30";
    case "green": return "#34c759";
    case "blue": return "#007aff";
    case "yellow": return "#ffcc00";
    default: return "#ffffff";
  }
}

function updateCountdowns() {
  countdowns.forEach((cd, index) => {
    const id = `countdown-${index + 1}`;
    const el = document.getElementById(id);
    const numberEl = el.querySelector(".countdown-number");
    const fg = el.querySelector(".fg");

    const days = daysRemaining(cd.date);
    numberEl.textContent = days;

    const totalDays = 365;
    const progress = Math.min(days / totalDays, 1);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    fg.style.strokeDasharray = circumference;
    fg.style.strokeDashoffset = circumference - (progress * circumference);

    const color = getAccentColor(cd.color);
    el.style.setProperty('--accent-color', color);

    // Show expanded view on click
    el.onclick = (e) => {
      e.stopPropagation(); // Prevent closing from global click handler
      const expanded = document.getElementById("expanded-view");
      expanded.classList.remove("hidden");

      const list = document.getElementById("countdown-list");
      list.innerHTML = countdowns.map(c => {
        const d = daysRemaining(c.date);
        const clr = getAccentColor(c.color);
        return `<li style="color: ${clr}">${c.name}: ${d} days left</li>`;
      }).join("");
    };
  });
}

// Hide expanded view if clicking outside
document.addEventListener("click", (e) => {
  const expanded = document.getElementById("expanded-view");
  const wrapper = document.getElementById("countdown-list-wrapper");

  if (
    expanded &&
    wrapper &&
    !expanded.classList.contains("hidden") &&
    !wrapper.contains(e.target)
  ) {
    expanded.classList.add("hidden");
  }
});

// Prevent closing when clicking inside the expanded view
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("countdown-list-wrapper");
  if (wrapper) {
    wrapper.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered ✅', reg.scope))
      .catch(err => console.error('SW registration failed ❌', err));
  });
}

// Init
loadCountdowns();
updateCountdowns();
setInterval(updateCountdowns, 1000 * 60 * 60); // Update hourly
