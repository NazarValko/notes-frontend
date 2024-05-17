import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NotesService } from '../../note-service/notes.service';
import { NoteCreateComponent } from './note-create.component';
import { noteReducer } from '../../store/reducers/note.reducer';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NoteCreateComponent', () => {
  let component: NoteCreateComponent;
  let fixture: ComponentFixture<NoteCreateComponent>;
  let notesService: NotesService;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let activatedRouteStub = { params: of({ id: 1 }) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoteCreateComponent, // Standalone component should be imported here
        FormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot({ notes: noteReducer }),
        RouterTestingModule
      ],
      providers: [
        NotesService,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCreateComponent);
    component = fixture.componentInstance;
    notesService = TestBed.inject(NotesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new note', () => {
    spyOn(notesService, 'createNote').and.returnValue(of({ id: 1, name: 'Test Note', description: 'Test Description', createdAt: new Date().toISOString() }));

    component.note = { id: 0, name: 'Test Note', description: 'Test Description', createdAt: new Date().toISOString() };
    component.submitForm();

    expect(notesService.createNote).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should update an existing note', () => {
    spyOn(notesService, 'updateNote').and.returnValue(of({ id: 1, name: 'Updated Note', description: 'Updated Description', createdAt: new Date().toISOString() }));

    component.note = { id: 1, name: 'Updated Note', description: 'Updated Description', createdAt: new Date().toISOString() };
    component.submitForm();

    expect(notesService.updateNote).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
