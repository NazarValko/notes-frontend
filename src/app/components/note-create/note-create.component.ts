import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Note } from '../../models/note';
import * as NoteActions from '../../store/actions/note.actions';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotesService } from '../../note-service/notes.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, TranslateModule, LanguageSelectorComponent],
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss']
})
export class NoteCreateComponent {
  note: Note = new Note(0, '', '', new Date().toISOString());

  constructor(
    private store: Store<{ notes: Note[] }>,
    private router: Router,
    private route: ActivatedRoute,
    private notesService: NotesService,
  ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.notesService.getNoteById(params['id']).subscribe(note => {
          this.note = note;
        });
      }
    });
  }

  submitForm() {
    if (this.note.id) {
      this.notesService.updateNote(this.note.id, this.note).subscribe(updatedNote => {
        this.store.dispatch(NoteActions.updateNote({ id: updatedNote.id, note: updatedNote }));
        this.router.navigate(['/']);
      });
    } else {
      this.notesService.createNote(this.note).subscribe(newNote => {
        this.store.dispatch(NoteActions.addNote({ note: newNote }));
        this.router.navigate(['/']);
      });
    }
  }
}
