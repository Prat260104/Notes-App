// 'app' container ko get kiya jisme saare notes dikh rahe hain
const app = document.getElementById("app");

// '+' button ko select kiya (note add karne ke liye)
const addBtn = document.getElementById("addBtn");

// Local Storage se saved notes fetch kiye (agar pehle kuch save hai to)
const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");

// Har saved note ko UI pe render kiya
savedNotes.forEach((noteObj) => addNote(noteObj.text, noteObj.time));

// '+' button pe click karne pe naya note add hoga
addBtn.addEventListener("click", () => addNote("", new Date().toLocaleString()));

// Ye function ek naya note banata hai aur UI me add karta hai
function addNote(text = "", time = null) {
  // Note wrapper banaya (textarea aur footer dono iske andar honge)
  const noteWrapper = document.createElement("div");
  noteWrapper.style.position = "relative";
  noteWrapper.style.display = "flex";
  noteWrapper.style.flexDirection = "column";

  // Textarea banaya note ke liye
  const textarea = document.createElement("textarea");
  textarea.classList.add("note"); // CSS class
  textarea.placeholder = "Empty note";
  textarea.value = text; // Pehle se koi text hai to set karo

  // Footer banaya jisme timestamp aur character count dikhayenge
  const footer = document.createElement("div");
  footer.style.fontSize = "12px";
  footer.style.color = "gray";
  footer.style.marginTop = "4px";
  footer.style.textAlign = "left";
  footer.style.padding = "0 5px";

  // Do elements: timestamp aur char count ke liye
  const timestamp = document.createElement("div");
  const charCount = document.createElement("div");

  // Timestamp ko set karo (agar pehle se mila hai to wahi, nahi to abhi ka)
  timestamp.innerText = time ? `🕒 ${time}` : `🕒 ${new Date().toLocaleString()}`;

  // Character count set karo (kitne characters likhe gaye)
  charCount.innerText = `✍️ ${text.length} characters`;

  // Footer me dono cheeze daali
  footer.appendChild(timestamp);
  footer.appendChild(charCount);

  // Jab user kuch likhe to live character count aur time update ho
  textarea.addEventListener("input", () => {
    charCount.innerText = `✍️ ${textarea.value.length} characters`; // Update char count
    timestamp.innerText = `🕒 ${new Date().toLocaleString()}`; // Update timestamp
    saveNotes(); // Changes save karo
  });

  // Double click pe confirm prompt aayega aur delete hoga
  textarea.addEventListener("dblclick", () => {
    const confirmDelete = confirm("Delete this note?");
    if (confirmDelete) {
      noteWrapper.remove(); // Note UI se hata do
      saveNotes(); // LocalStorage update karo
    }
  });

  // Wrapper me textarea aur footer daala
  noteWrapper.appendChild(textarea);
  noteWrapper.appendChild(footer);

  // Note ko app ke andar insert karo (button ke pehle)
  app.insertBefore(noteWrapper, addBtn);

  // Note save karo localStorage me
  saveNotes();
}

// Saare notes ko localStorage me save karta hai
function saveNotes() {
  const noteWrappers = document.querySelectorAll(".note"); // Saare textarea notes
  const allFooters = document.querySelectorAll("div > div > div:first-child"); // Timestamps

  const notes = [];

  // Har note ka text aur time nikal ke ek array me daalo
  noteWrappers.forEach((textarea, i) => {
    notes.push({
      text: textarea.value,
      time: allFooters[i]?.innerText?.replace("🕒 ", "") || new Date().toLocaleString()
    });
  });

  // JSON format me localStorage me save karo
  localStorage.setItem("notes", JSON.stringify(notes));
}
