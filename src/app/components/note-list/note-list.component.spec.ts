import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NotesService } from '../../note-service/notes.service';
import { NoteListComponent } from './note-list.component';
import { noteReducer } from '../../store/reducers/note.reducer';
import { RouterTestingModule } from '@angular/router/testing';

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;
  let notesService: NotesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoteListComponent, // Standalone component should be imported here
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot({ notes: noteReducer }),
        RouterTestingModule
      ],
      providers: [NotesService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    notesService = TestBed.inject(NotesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all notes on init', () => {
    const dummyNotes = [
      { id: 1, name: 'Test Note 1', description: 'Description 1', createdAt: '2023-01-01' },
      { id: 2, name: 'Test Note 2', description: 'Description 2', createdAt: '2023-01-02' }
    ];

    spyOn(notesService, 'getAllNotes').and.returnValue(of(dummyNotes));
    spyOn(component['store'], 'dispatch');

    component.ngOnInit();

    expect(notesService.getAllNotes).toHaveBeenCalled();
    expect(component['store'].dispatch).toHaveBeenCalledWith(jasmine.any(Object));
  });

  it('should delete a note', () => {
    spyOn(notesService, 'deleteNote').and.returnValue(of('Note deleted'));
    spyOn(component['store'], 'dispatch');

    component.deleteNote(1);

    expect(notesService.deleteNote).toHaveBeenCalledWith(1);
    expect(component['store'].dispatch).toHaveBeenCalledWith(jasmine.any(Object));
  });
});
