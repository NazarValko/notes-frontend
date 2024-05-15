import { createReducer, on } from '@ngrx/store';
import { Note } from '../../models/note';
import * as NoteActions from '../actions/note.actions';
import { addNote, loadNotesSuccess } from '../actions/note.actions';

export const initialState: Note[] = [];

export const noteReducer = createReducer(
  initialState,
  on(loadNotesSuccess, (state, { notes }) => [...notes]),
  on(addNote, (state, { note }) => [...state, note]),
  on(NoteActions.updateNote, (state, { id, note }) =>
    state.map(n => (n.id === id ? { ...note } : n))
  ),
  on(NoteActions.deleteNote, (state, { id }) => state.filter(note => note.id !== id))
);