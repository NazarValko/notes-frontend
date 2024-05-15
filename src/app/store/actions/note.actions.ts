import { createAction, props } from '@ngrx/store';
import { Note } from '../../models/note';

export const loadNotes = createAction('[Note List] Load Notes');
export const loadNotesSuccess = createAction(
  '[Note List] Load Notes Success',
  props<{ notes: Note[] }>()
);

export const addNote = createAction(
  '[Note Create] Add Note',
  props<{ note: Note }>()
);

export const updateNote = createAction(
  '[Note Edit] Update Note',
  props<{ id: number, note: Note }>()
);

export const deleteNote = createAction(
  '[Note List] Delete Note',
  props<{ id: number }>()
);