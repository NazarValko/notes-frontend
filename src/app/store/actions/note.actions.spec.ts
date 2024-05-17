import * as NoteActions from './note.actions';
import { Note } from '../../models/note';

describe('Note Actions', () => {
  it('should create loadNotes action', () => {
    const action = NoteActions.loadNotes();
    expect(action.type).toBe('[Note List] Load Notes');
  });

  it('should create loadNotesSuccess action', () => {
    const notes: Note[] = [
      { id: 1, name: 'Test Note 1', description: 'Description 1', createdAt: '2023-01-01' }
    ];
    const action = NoteActions.loadNotesSuccess({ notes });
    expect(action.type).toBe('[Note List] Load Notes Success');
    expect(action.notes).toEqual(notes);
  });

  it('should create addNote action', () => {
    const note: Note = { id: 2, name: 'Test Note 2', description: 'Description 2', createdAt: '2023-01-02' };
    const action = NoteActions.addNote({ note });
    expect(action.type).toBe('[Note Create] Add Note');
    expect(action.note).toEqual(note);
  });

  it('should create updateNote action', () => {
    const note: Note = { id: 3, name: 'Updated Note', description: 'Updated Description', createdAt: '2023-01-03' };
    const action = NoteActions.updateNote({ id: 3, note });
    expect(action.type).toBe('[Note Edit] Update Note');
    expect(action.id).toBe(3);
    expect(action.note).toEqual(note);
  });

  it('should create deleteNote action', () => {
    const action = NoteActions.deleteNote({ id: 4 });
    expect(action.type).toBe('[Note List] Delete Note');
    expect(action.id).toBe(4);
  });
});
