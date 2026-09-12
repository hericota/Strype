import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  menuAberto = false;
  termoPesquisa = '';

  private readonly router = inject(Router);

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