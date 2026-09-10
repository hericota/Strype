import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { PostProdutos } from './feats/posts/post-produtos/post-produtos';
import { produtosCadastrados } from './feats/posts/produtos-cadastrados/produtos-cadastrados';
import { LoginComponente } from './feats/login-componente/login-componente';

@Component({
  imports: [RouterOutlet, PostProdutos, LoginComponente, produtosCadastrados],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('pagina-favoritos');
}
