const editButtons = document.querySelectorAll('.edit-button');
const noteContents = document.querySelectorAll('.note-content');
const addNoteButton = document.getElementById('add-note-button');
const notesContainer = document.querySelector('.notes-container');

editButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const newText = prompt('Edit the note:', noteContents[index].textContent);
    if (newText !== null) {
      noteContents[index].textContent = newText;
    }
  });
});

addNoteButton.addEventListener('click', () => {
  const newNoteColumn = document.createElement('div');
  newNoteColumn.classList.add('note-column');
  newNoteColumn.innerHTML = `
    <div class="note-header">
      <button class="edit-button">Edit</button>
    </div>
    <div class="note-content">
      <p>New note content</p>
    </div>
  `;
  notesContainer.appendChild(newNoteColumn);

  const newEditButton = newNoteColumn.querySelector('.edit-button');
  const newNoteContent = newNoteColumn.querySelector('.note-content');

  newEditButton.addEventListener('click', () => {
    const newText = prompt('Edit the note:', newNoteContent.textContent);
    if (newText !== null) {
      newNoteContent.textContent = newText;
    }
  });
});

const addButtons = document.querySelectorAll('.add-button');

let notes = [];

// Load notes from JSON or use an empty array if not found
const savedNotes = localStorage.getItem('notes');
if (savedNotes) {
  notes = JSON.parse(savedNotes);
}

function updateLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
  notes.forEach((noteContent) => {
    const newNote = document.createElement('div');
    newNote.className = 'note-content';
    newNote.innerHTML = `<p>${noteContent}</p>`;
    const firstColumn = document.querySelector('.note-column');
    firstColumn.parentNode.insertBefore(newNote, firstColumn.nextSibling);
  });
}

renderNotes();

editButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const newText = prompt('Edit the note:', noteContents[index].textContent);
    if (newText !== null) {
      noteContents[index].textContent = newText;
      notes[index] = newText;
      updateLocalStorage();
    }
  });
});

addButtons.forEach(() => {
  addButtons[0].addEventListener('click', () => {
    const newNoteContent = prompt('Enter the new note:');
    if (newNoteContent !== null) {
      notes.push(newNoteContent);
      updateLocalStorage();
      renderNotes();
    }
  });
});


