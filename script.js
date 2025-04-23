const weekDays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const subjects = ['Accounting', 'Finance', 'Management', 'Statistics', 'English', 'Bangla'];

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

// Render week and subjects
const weekContainer = document.getElementById('week-container');

weekDays.forEach(day => {
  const card = document.createElement('div');
  card.className = 'day-card';

  const title = document.createElement('h3');
  title.textContent = day;
  card.appendChild(title);

  subjects.forEach(sub => {
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${day}-${sub}`;
    checkbox.checked = getStatus(day, sub);

    checkbox.addEventListener('change', () => {
      saveStatus(day, sub, checkbox.checked);
    });

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = sub;

    subjectDiv.appendChild(checkbox);
    subjectDiv.appendChild(label);
    card.appendChild(subjectDiv);
  });

  weekContainer.appendChild(card);
});

// Save/load checkbox state
function saveStatus(day, subject, checked) {
  const key = `study-${day}-${subject}`;
  localStorage.setItem(key, checked);
}

function getStatus(day, subject) {
  const key = `study-${day}-${subject}`;
  return localStorage.getItem(key) === 'true';
}
