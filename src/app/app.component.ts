import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StoreModule, provideStore } from '@ngrx/store';
import { noteReducer } from './store/reducers/note.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'notes-frontend';
}
