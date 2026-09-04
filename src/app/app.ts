import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { PostProdutos } from './feats/posts/post-produtos/post-produtos';

@Component({
  imports: [RouterOutlet, Home, PostProdutos],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('stryde');
}
