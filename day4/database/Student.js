// In-memory "database" — resets every time the server restarts.
// On Day 4 we use a plain array instead of MongoDB.

let students = [
  { id: 1, name: "Sehar", email: "sehar123@email.com", course: "MERN Stack", marks: 88 },
  { id: 2, name: "Rehan", email: "rehan@email.com", course: "AI", marks: 67 },
  { id: 3, name: "Mobeen", email: "mobeen@email.com", course: "Frontend Dev", marks: 45 }
];

let nextId = 4; // next id to assign when a student is created

module.exports = {
  students,
  getNextId: () => nextId,
  incrementNextId: () => { nextId++; }
};