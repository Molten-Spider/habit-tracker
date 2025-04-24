const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");
const calendar = document.getElementById("calendar");

let currentDate = new Date();
let selectedDate = formatDate(currentDate);

let globalHabits = []; // All habits go here
let habitStatusByDate = {}; // Track done/undone per date

function formatDate(date) {
  return date.toISOString().slice(5, 10);
}

function createCalendar() {
  calendar.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const day = new Date();
    day.setDate(currentDate.getDate() - 6 + i);
    const dateStr = formatDate(day);

    const btn = document.createElement("button");
    btn.innerText = dateStr;
    btn.className = "px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400";
    if (dateStr === selectedDate) {
      btn.classList.add("selected-date");
    }
    btn.onclick = () => {
      selectedDate = dateStr;
      displayHabits();
      createCalendar();
    };
    calendar.appendChild(btn);
  }
}

function addHabit() {
  const habit = habitInput.value.trim();
  if (!habit || globalHabits.includes(habit)) return;

  globalHabits.push(habit);
  habitInput.value = "";
  displayHabits();
  updateChart();
}

function toggleHabit(habitName) {
  if (!habitStatusByDate[selectedDate]) {
    habitStatusByDate[selectedDate] = {};
  }

  habitStatusByDate[selectedDate][habitName] = !habitStatusByDate[selectedDate][habitName];
  displayHabits();
  updateChart();
}

function displayHabits() {
  habitList.innerHTML = "";

  globalHabits.forEach(habit => {
    const done = habitStatusByDate[selectedDate]?.[habit] || false;

    const row = document.createElement("div");
    row.className = "flex justify-between items-center bg-blue-100 p-2 rounded-md";

    const name = document.createElement("span");
    name.className = done ? "line-through text-gray-500" : "";
    name.innerText = habit;

    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = done ? "Undo" : "Done";
    toggleBtn.className = done ? "bg-red-300 px-3 py-1 rounded-md" : "bg-green-400 px-3 py-1 rounded-md";
    toggleBtn.onclick = () => toggleHabit(habit);

    row.appendChild(name);
    row.appendChild(toggleBtn);
    habitList.appendChild(row);
  });
}

createCalendar();
displayHabits();
