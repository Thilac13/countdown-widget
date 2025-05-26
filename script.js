// Predefined countdowns (customize as needed)
const countdowns = [
  { name: "GOST Exam", date: "2025-06-24", color: "red" },
  { name: "Graduation", date: "2025-07-07", color: "green" },
  { name: "MIST", date: "2025-08-10", color: "blue" },
  { name: "FMGe", date: "2025-12-31", color: "yellow" }
];

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

    // Add click to show expanded view
    el.onclick = () => {
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

// Close expanded view when clicking outside the list wrapper
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

updateCountdowns();
setInterval(updateCountdowns, 1000 * 60 * 60); // Update hourly
