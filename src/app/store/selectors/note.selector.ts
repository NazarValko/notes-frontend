import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Note } from "../../models/note";


export const selectNotesState = createFeatureSelector<Note[]>('notes');

export const selectAllNotes = createSelector(
  selectNotesState,
  (notes) => notes
);

export const selectNoteById = (id: number) => createSelector(
  selectNotesState,
  (notes) => notes.find(note => note.id === id)
);