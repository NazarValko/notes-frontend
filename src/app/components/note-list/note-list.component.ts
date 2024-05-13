import { Component } from '@angular/core';
import { Note } from '../../models/note';
import { NotesService } from '../../note-service/notes.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  notes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.notesService.getAllNotes().subscribe({
      next: (data) => {
        this.notes = data;
      },
      error: (err) => console.error('Error fetching notes', err)
    });
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter(note => note.id !== id);
    });
  }
}
