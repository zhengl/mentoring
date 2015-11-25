import Notes from './Notes';

const __NOTES__ = [
    {
      id: 1,
      content: 'note 1',
    },
    {
      id: 2,
      content: 'note 2',
    },
];

const __ROOT__ = document.getElementById('notes');

const notes = new Notes();

function createNotes(notes) {
    notes
        .map(createNote)
        .forEach(element => __ROOT__.appendChild(element));
}

function createNote(note) {
    const element = document.createElement('li');
    const textNode = document.createTextNode(note.content);
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'REMOVE';
    removeButton.onclick = () => {
        notes.removingNote(note.id).then( () => {
            element.parentNode.removeChild(element);
        } );
    }
    element.appendChild(removeButton);
    element.appendChild(textNode);
    return element;
}

notes.settingNotes(__NOTES__).then( () =>
  notes.gettingNotes().then( notes => createNotes(notes) ));

const searchInput = document.getElementById('search');
searchInput.onkeyup = () => {
    notes.searchingForNotes(searchInput.value).then(notes => {
        __ROOT__.innerHTML = '';
        createNotes(notes);
    });
};

const newNoteForm = document.getElementById('new-note');
const newNoteInput = document.getElementById('new-note__input');
newNoteForm.onsubmit = (event) => {
    event.preventDefault();

    var newNote = newNoteInput.value;
    if(newNote.trim() === '') {
        return;
    }

    notes.addingNote(newNote).then( newNote => {
        __ROOT__.appendChild(createNote(newNote));
    } )
    newNoteInput.value = '';
};
