// Sample countdowns
const countdowns = [
  { name: "GOST Exam", date: "2025-06-24", color: 1 },
  { name: "Graduation", date: "2025-07-07", color: 2 },
  { name: "MIST", date: "2025-08-10", color: 3 },
  { name: "FMGe", date: "2025-12-31", color: 4 }
];

function daysRemaining(targetDate) {
  const now = new Date();
  const then = new Date(targetDate);
  const diff = then - now;
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
}

function updateCountdowns() {
  countdowns.forEach((cd, index) => {
    const el = document.getElementById(`countdown-${index + 1}`);
    if (!el) return;

    const svg = el.querySelector("svg");
    const fg = svg.querySelector(".fg");
    const text = el.querySelector(".countdown-number");

    const days = daysRemaining(cd.date);
    const totalDays = 100; // Customizable
    const progress = Math.min(days / totalDays, 1);

    const circleLength = 2 * Math.PI * 50;
    fg.style.strokeDasharray = circleLength;
    fg.style.strokeDashoffset = circleLength * (1 - progress);
    fg.style.stroke = `var(--accent${cd.color})`;

    text.textContent = days;
    text.style.color = `var(--accent${cd.color})`;

    el.onclick = () => {
      document.getElementById("expanded-view").classList.remove("hidden");
      const list = document.getElementById("countdown-list");
      list.innerHTML = countdowns.map(c => {
        const d = daysRemaining(c.date);
        return `<li style="color: var(--accent${c.color})">${c.name}: ${d} days left</li>`;
      }).join("");
    };
  });
}

updateCountdowns();
setInterval(updateCountdowns, 60 * 60 * 1000); // Update hourly
