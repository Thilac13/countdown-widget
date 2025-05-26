const countdowns = [
  { name: "GOST Exam", date: "2025-06-24", color: 1 },
  { name: "Graduation", date: "2025-07-07", color: 2 },
  { name: "MIST", date: "2025-08-10", color: 3 },
  { name: "FMGe", date: "2025-12-31", color: 4 }
];

function getAccentColor(colorId) {
  switch (colorId) {
    case 1: return '#ff3b30'; // red
    case 2: return '#34c759'; // green
    case 3: return '#0a84ff'; // blue
    case 4: return '#ffd60a'; // yellow
    default: return '#8e8e93'; // gray
  }
}

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
  });
}

updateCountdowns();
setInterval(updateCountdowns, 1000 * 60 * 60);