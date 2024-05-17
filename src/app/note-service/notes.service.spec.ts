import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotesService } from './notes.service';
import { Note } from '../models/note';

describe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotesService]
    });
    service = TestBed.inject(NotesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all notes', () => {
    const dummyNotes: Note[] = [
      { id: 1, name: 'Test Note 1', description: 'Description 1', createdAt: '2023-01-01' },
      { id: 2, name: 'Test Note 2', description: 'Description 2', createdAt: '2023-01-02' }
    ];

    service.getAllNotes().subscribe(notes => {
      expect(notes.length).toBe(2);
      expect(notes).toEqual(dummyNotes);
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyNotes);
  });

  it('should fetch a note by id', () => {
    const dummyNote: Note = { id: 1, name: 'Test Note 1', description: 'Description 1', createdAt: '2023-01-01' };

    service.getNoteById(1).subscribe(note => {
      expect(note).toEqual(dummyNote);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyNote);
  });

  it('should create a new note', () => {
    const newNote: Note = { id: 3, name: 'Test Note 3', description: 'Description 3', createdAt: '2023-01-03' };

    service.createNote(newNote).subscribe(note => {
      expect(note).toEqual(newNote);
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newNote);
  });

  it('should update an existing note', () => {
    const updatedNote: Note = { id: 1, name: 'Updated Note', description: 'Updated Description', createdAt: '2023-01-01' };

    service.updateNote(updatedNote.id, updatedNote).subscribe(note => {
      expect(note).toEqual(updatedNote);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedNote);
  });

  it('should delete a note', () => {
    service.deleteNote(1).subscribe(response => {
      expect(response).toEqual('Note deleted');
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Note deleted');
  });
});
