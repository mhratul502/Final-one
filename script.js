const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const subjects = ['Accounting', 'Finance', 'Management', 'Statistics', 'English', 'Bangla'];

// Get today
const todayIndex = new Date().getDay();
const todayName = weekDays[todayIndex];

// Show today's date
document.getElementById('current-date').textContent =
  `Today's Date: ${new Date().toLocaleDateString('en-GB')} (${todayName})`;

// Load name
const nameInput = document.getElementById('name-input');
const saveBtn = document.getElementById('save-name');
const mainTitle = document.getElementById('main-title');

const savedName = localStorage.getItem('trackerName');
if (savedName) {
  mainTitle.textContent = `📘 ${savedName}'s Study Tracker`;
  nameInput.value = savedName;
}

saveBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem('trackerName', name);
    mainTitle.textContent = `📘 ${name}'s Study Tracker`;
  }
});

// Render subjects for the week
const weekContainer = document.getElementById('week-container');
weekDays.forEach(day => {
  const card = document.createElement('div');
  card.className = 'day-card';
  card.innerHTML = `<h3>${day}</h3>`;

  subjects.forEach(subject => {
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${day}-${subject}`;
    checkbox.disabled = day !== todayName;
    checkbox.checked = getStatus(day, subject);

    checkbox.addEventListener('change', () => {
      saveStatus(day, subject, checkbox.checked);
    });

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = subject;

    subjectDiv.appendChild(checkbox);
    subjectDiv.appendChild(label);
    card.appendChild(subjectDiv);
  });

  weekContainer.appendChild(card);
});

// Save/load checkbox
function saveStatus(day, subject, checked) {
  const key = `study-${day}-${subject}`;
  localStorage.setItem(key, checked);
}

function getStatus(day, subject) {
  const key = `study-${day}-${subject}`;
  return localStorage.getItem(key) === 'true';
}

// Reset week
document.getElementById('reset-week').addEventListener('click', () => {
  if (confirm("Reset all subjects for the week?")) {
    weekDays.forEach(day => {
      subjects.forEach(subject => {
        const key = `study-${day}-${subject}`;
        localStorage.removeItem(key);
        const checkbox = document.getElementById(`${day}-${subject}`);
        if (checkbox) checkbox.checked = false;
      });
    });
  }
});

// Theme toggle
const themeBtn = document.getElementById('toggle-theme');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});
