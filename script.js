// Example countdowns (replace with real user input logic later)
const countdowns = [
  { name: "GOST Exam", date: "2025-06-24", color: 1 },
  { name: "Graduation", date: "2025-07-7", color: 2 },
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
    const id = `countdown-${index + 1}`;
    const el = document.getElementById(id);
    const days = daysRemaining(cd.date);

    const totalDays = 365; // Assume a max range for demo
    const progress = Math.min(360 * (1 - days / totalDays), 360);

    el.style.background = `conic-gradient(var(--accent${cd.color}) ${progress}deg, #ccc ${progress}deg)`;
    el.textContent = days;
    el.dataset.color = cd.color;

    // Add click to show expanded view
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
setInterval(updateCountdowns, 1000 * 60 * 60); // Update hourly
