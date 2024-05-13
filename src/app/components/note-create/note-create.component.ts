import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Note } from '../../models/note';
import { NotesService } from '../../note-service/notes.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss']
})
export class NoteCreateComponent {
  note: Note = new Note(0, '', '', new Date().toISOString());

  constructor(
    private notesService: NotesService, 
    private router: Router,
    private route: ActivatedRoute
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
      this.notesService.updateNote(this.note.id, this.note).subscribe({
        next: () => this.router.navigate(['/notes']),
      });
    } else {
      this.notesService.createNote(this.note).subscribe({
        next: () => this.router.navigate(['/notes']),
      });
    }
  }
}
