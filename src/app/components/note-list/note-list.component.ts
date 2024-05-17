import { Component } from '@angular/core';
import { Note } from '../../models/note';
import * as NoteActions from '../../store/actions/note.actions';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotesService } from '../../note-service/notes.service';
import { deleteNote, loadNotes } from '../../store/actions/note.actions';
import { selectAllNotes } from '../../store/selectors/note.selector';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, TranslateModule, LanguageSelectorComponent],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  notes$: Observable<Note[]>;

  constructor(private store: Store<{ notes: Note[] }>, private notesService: NotesService) {
    this.notes$ = this.store.select(selectAllNotes);
  }

  ngOnInit() {
    this.notesService.getAllNotes().subscribe(notes => {
      this.store.dispatch(NoteActions.loadNotesSuccess({ notes }));
    });
    this.store.dispatch(loadNotes());
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id).subscribe(() => {
      this.store.dispatch(deleteNote({ id }));
    });
  }
}
