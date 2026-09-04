import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Favoritos } from './favoritos/favoritos';

@Component({
  imports: [RouterOutlet, Favoritos],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pagina-favoritos');
}
