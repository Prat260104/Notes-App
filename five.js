const app = document.getElementById("app");
const addBtn = document.getElementById("addBtn");

// Load saved notes from local storage
const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
savedNotes.forEach((noteText) => addNote(noteText));

// Add new note when button clicked
addBtn.addEventListener("click", () => addNote(""));

function addNote(text = "") {
  const textarea = document.createElement("textarea");
  textarea.classList.add("note");
  textarea.placeholder = "Empty note";
  textarea.value = text;

  // Add double-click to delete
  textarea.addEventListener("dblclick", () => {
    const confirmDelete = confirm("Delete this note?");
    if (confirmDelete) {
      textarea.remove();
      saveNotes();
    }
  });

  // Save notes on change
  textarea.addEventListener("input", saveNotes);

  // Insert before the "+" button
  app.insertBefore(textarea, addBtn);
  saveNotes();
}

// Save all notes to local storage
function saveNotes() {
  const allNotes = document.querySelectorAll(".note");
  const notes = [];
  allNotes.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}
