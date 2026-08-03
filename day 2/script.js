// ===========================================
// DAY 2 - Student Records App
// Concepts used: Arrays, Objects, Functions, DOM
// ===========================================

// ---- 1. DATA ----
// An array of objects. Each object = one student.
let students = [
  { id: 1, name: "Ayesha Khan", email: "ayesha@email.com", course: "MERN Stack", marks: 88 },
  { id: 2, name: "Bilal Ahmed", email: "bilal@email.com", course: "MERN Stack", marks: 42 },
  { id: 3, name: "Sara Iqbal", email: "sara@email.com", course: "Frontend Dev", marks: 67 },
  { id: 4, name: "Hamza Tariq", email: "hamza@email.com", course: "Backend Dev", marks: 91 }
];

// Keeps track of the next unique ID to assign to a new student
let nextId = students.length + 1;

// ---- 2. GRAB DOM ELEMENTS ----
const studentForm = document.getElementById("student-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseInput = document.getElementById("course");
const marksInput = document.getElementById("marks");

const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");

const studentListEl = document.getElementById("student-list");
const studentCountEl = document.getElementById("student-count");
const emptyMessageEl = document.getElementById("empty-message");

// ---- 3. FUNCTIONS ----

// Returns a CSS class + label based on marks value
function getMarksBadge(marks) {
  if (marks >= 80) return { className: "marks-distinction", label: `${marks} • Distinction` };
  if (marks >= 50) return { className: "marks-pass", label: `${marks} • Pass` };
  return { className: "marks-fail", label: `${marks} • Fail` };
}

// Builds the HTML for ONE student card
function createStudentCard(student) {
  const badge = getMarksBadge(student.marks);

  const card = document.createElement("div");
  card.className = "student-card";

  card.innerHTML = `
    <div class="student-id">#${student.id}</div>
    <div class="student-info">
      <strong>${student.name}</strong>
      <span>${student.email} • ${student.course}</span>
    </div>
    <div class="marks-badge ${badge.className}">${badge.label}</div>
  `;

  return card;
}

// Renders a given list of students into the page
function renderStudents(list) {
  // Clear whatever is currently shown
  studentListEl.innerHTML = "";

  if (list.length === 0) {
    emptyMessageEl.style.display = "block";
  } else {
    emptyMessageEl.style.display = "none";
    list.forEach(student => {
      const card = createStudentCard(student);
      studentListEl.appendChild(card);
    });
  }

  updateStudentCount(list.length);
}

// Updates the "X students" badge
function updateStudentCount(count) {
  studentCountEl.textContent = `${count} student${count === 1 ? "" : "s"}`;
}

// Adds a new student object to the array
function addStudent(name, email, course, marks) {
  const newStudent = {
    id: nextId,
    name: name,
    email: email,
    course: course,
    marks: Number(marks)
  };

  students.push(newStudent);
  nextId++;

  applyFilters(); // re-render with current search/filter applied
}

// Searches students by name (case-insensitive, partial match)
function searchByName(list, query) {
  if (!query) return list;
  return list.filter(student =>
    student.name.toLowerCase().includes(query.toLowerCase())
  );
}

// Filters students based on the selected marks category
function filterByMarks(list, filterValue) {
  switch (filterValue) {
    case "pass":
      return list.filter(student => student.marks >= 50);
    case "fail":
      return list.filter(student => student.marks < 50);
    case "distinction":
      return list.filter(student => student.marks >= 80);
    default:
      return list; // "all"
  }
}

// Combines search + filter, then renders the result
function applyFilters() {
  const query = searchInput.value;
  const filterValue = filterSelect.value;

  let result = students;
  result = searchByName(result, query);
  result = filterByMarks(result, filterValue);

  renderStudents(result);
}

// ---- 4. EVENT LISTENERS ----

// Handle form submission -> add new student
studentForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop page from reloading

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const course = courseInput.value.trim();
  const marks = marksInput.value;

  if (!name || !email || !course || marks === "") {
    alert("Please fill in all fields.");
    return;
  }

  addStudent(name, email, course, marks);

  // Reset the form for the next entry
  studentForm.reset();
  nameInput.focus();
});

// Live search as user types
searchInput.addEventListener("input", applyFilters);

// Filter dropdown change
filterSelect.addEventListener("change", applyFilters);

// ---- 5. INITIAL RENDER ----
applyFilters();