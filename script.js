const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        }) 

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        }) 

        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

// --- FAB + Notes Feature ---
const fab = document.getElementById("addBtn");
const fabOptions = document.getElementById("fabOptions");

const addNoteBtn = document.getElementById("addNoteBtn");
const viewNotesBtn = document.getElementById("viewNotesBtn");

const noteModal = document.getElementById("noteModal");
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const deleteNoteBtn = document.getElementById("deleteNoteBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notesApp")) || [];
let currentNoteIndex = null;

// Toggle FAB options
fab.addEventListener("click", () => {
  fabOptions.classList.toggle("show");
});

// Add New Note
addNoteBtn.addEventListener("click", () => {
  currentNoteIndex = null;
  noteInput.value = "";
  noteModal.classList.remove("hidden");
  fabOptions.classList.remove("show");
});

// View Notes
viewNotesBtn.addEventListener("click", () => {
  renderNotes();
  fabOptions.classList.remove("show");
});

// Save Note
saveNoteBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (text) {
    if (currentNoteIndex !== null) {
      notes[currentNoteIndex] = text;
    } else {
      notes.push(text);
    }
    localStorage.setItem("notesApp", JSON.stringify(notes));
    renderNotes();
    noteModal.classList.add("hidden");
  }
});

// Delete Note in Modal
deleteNoteBtn.addEventListener("click", () => {
  if (currentNoteIndex !== null) {
    notes.splice(currentNoteIndex, 1);
    localStorage.setItem("notesApp", JSON.stringify(notes));
    renderNotes();
  }
  noteModal.classList.add("hidden");
});

// Close Modal
closeModalBtn.addEventListener("click", () => {
  noteModal.classList.add("hidden");
});

// Render Notes
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "note-card";

    const p = document.createElement("p");
    p.innerText = note;

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", () => {
      notes.splice(index, 1);
      localStorage.setItem("notesApp", JSON.stringify(notes));
      renderNotes();
    });

    card.appendChild(p);
    card.appendChild(delBtn);
    notesContainer.appendChild(card);

    // Click card to edit
    card.addEventListener("click", (e) => {
      if (e.target === delBtn) return;
      currentNoteIndex = index;
      noteInput.value = note;
      noteModal.classList.remove("hidden");
    });
  });
}

// Initial render
renderNotes();
