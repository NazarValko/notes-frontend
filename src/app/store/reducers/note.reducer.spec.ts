import { noteReducer, initialState } from './note.reducer';
import * as NoteActions from '../actions/note.actions';
import { Note } from '../../models/note';

describe('Note Reducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = noteReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should load notes', () => {
    const notes: Note[] = [
      { id: 1, name: 'Test Note 1', description: 'Description 1', createdAt: '2023-01-01' }
    ];
    const action = NoteActions.loadNotesSuccess({ notes });
    const state = noteReducer(initialState, action);
    expect(state).toEqual(notes);
  });

  it('should add a note', () => {
    const note: Note = { id: 2, name: 'Test Note 2', description: 'Description 2', createdAt: '2023-01-02' };
    const action = NoteActions.addNote({ note });
    const state = noteReducer(initialState, action);
    expect(state).toEqual([note]);
  });

  it('should update a note', () => {
    const initialNotes: Note[] = [
      { id: 1, name: 'Test Note 1', description: 'Description 1', createdAt: '2023-01-01' }
    ];
    const updatedNote: Note = { id: 1, name: 'Updated Note', description: 'Updated Description', createdAt: '2023-01-01' };
    const action = NoteActions.updateNote({ id: 1, note: updatedNote });
    const state = noteReducer(initialNotes, action);
    expect(state).toEqual([updatedNote]);
  });

  it('should delete a note', () => {
    const initialNotes: Note[] = [
      { id: 1, name: 'Test Note 1', description: 'Description 1', createdAt: '2023-01-01' }
    ];
    const action = NoteActions.deleteNote({ id: 1 });
    const state = noteReducer(initialNotes, action);
    expect(state).toEqual([]);
  });
});
