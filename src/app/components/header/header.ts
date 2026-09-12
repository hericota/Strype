import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  menuAberto = false;
  termoPesquisa = '';

  constructor(private readonly router: Router) {}

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  pesquisar() {
    const termo = this.termoPesquisa.trim();

    this.router.navigate(['/produtos'], {
      queryParams: termo ? { q: termo } : {},
    });
  }
}