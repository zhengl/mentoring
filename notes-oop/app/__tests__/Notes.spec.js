import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;

import Notes from '../Notes';

describe('Notes', () => {
  let notes;
  const data = [
    {
      id: 1,
      content: 'note 1',
    },
    {
      id: 2,
      content: 'note 2',
    },
  ];

  beforeEach((done) => {
    notes = new Notes();
    notes.settingNotes(data).then(done);
  });

  it('should get all notes', () => {
    return expect(notes.gettingNotes()).to.eventually.deep.equal(data);
  });

  it('should add a new note', (done) => {
    const newNote = 'note 3';
    notes.addingNote(newNote).then((returnedNote) => {
      expect(returnedNote).to.have.property('content', newNote);
      expect(notes.gettingNotes()).to.eventually.have.deep.property(`[${data.length}].content`, newNote).notify(done);
    });
  });

  it('should remove a note', (done) => {
    const toRemoveNoteId = data[0].id;
    notes.removingNote(toRemoveNoteId).then(() => {
      expect(notes.gettingNotes()).to.eventually.not.to.include(data[0]).notify(done);
    });
  });

  it('should search for notes', () => {
    return expect(notes.searchingForNotes('1')).to.eventually.deep.equal([data[0]]);
  });

  it('should search for notes without case sensitivity', () => {
    return expect(notes.searchingForNotes('NOTE')).to.eventually.deep.equal(data);
  });
});
