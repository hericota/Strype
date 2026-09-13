import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private readonly router = inject(Router);

  menuAberto = false;
  termoPesquisa = '';

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  pesquisar() {
    const termo = this.termoPesquisa.trim();

    this.router.navigate(['/produtos'], {
      queryParams: termo ? { busca: termo } : {},
    });
  }
}