import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteCreateComponent } from './components/note-create/note-create.component';

export const routes: Routes = [
    { path: '', redirectTo: '/notes', pathMatch: 'full' },
    { path: 'notes', component: NoteListComponent },
    { path: 'create', component: NoteCreateComponent },
    { path: 'edit/:id', component: NoteCreateComponent }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
