import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponente } from "./feats/login-componente/login-componente";

@Component({
  imports: [RouterOutlet, LoginComponente],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('stryde');
}
