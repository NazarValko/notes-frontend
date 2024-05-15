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
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, TranslateModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  notes$: Observable<Note[]>;

  constructor(private store: Store<{ notes: Note[] }>, private notesService: NotesService, private translate: TranslateService) {
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

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.translate.use(lang);
  }
}
