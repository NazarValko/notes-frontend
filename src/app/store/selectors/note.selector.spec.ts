import { selectNotesState, selectAllNotes, selectNoteById } from './note.selector';
import { Note } from '../../models/note';

describe('Note Selectors', () => {
  const initialState: Note[] = [
    { id: 1, name: 'Test Note 1', description: 'Description 1', createdAt: '2023-01-01' },
    { id: 2, name: 'Test Note 2', description: 'Description 2', createdAt: '2023-01-02' }
  ];

  it('should select the notes state', () => {
    const result = selectNotesState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select all notes', () => {
    const result = selectAllNotes.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select note by id', () => {
    const result = selectNoteById(1).projector(initialState);
    expect(result).toEqual({ id: 1, name: 'Test Note 1', description: 'Description 1', createdAt: '2023-01-01' });
  });

  it('should return undefined for non-existent note id', () => {
    const result = selectNoteById(3).projector(initialState);
    expect(result).toBeUndefined();
  });
});

