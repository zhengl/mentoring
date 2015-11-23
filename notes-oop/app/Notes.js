export default class Notes {
  constructor() {
    this.notes = [];
  }

  settingNotes(notes) {
    return new Promise((resolve, reject) => {
      this.notes = [...notes];
      resolve();
    });
  }

  gettingNotes() {
    return new Promise((resolve, reject) => {
      resolve(this.notes);
    });
  }

  addingNote(note) {
    return new Promise((resolve, reject) => {
      this.notes.push({
        id: 3,
        content: note
      });
      resolve();
    });
  }

  removingNote(noteId) {
    return new Promise((resolve, reject) => {
      this.notes = this.notes.filter(note => note.id !== noteId);
      resolve();
    });
  }

  searchingForNotes(keyword) {
    return new Promise((resolve, reject) => {
      const regex = new RegExp(keyword, 'i');
      resolve(this.notes.filter(note => note.content.match(regex)));
    });
  }
}
