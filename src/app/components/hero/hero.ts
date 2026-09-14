import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    imports: [RouterLink, FormsModule],
    selector: 'app-hero',
    styleUrl: './hero.css',
    templateUrl: './hero.html',
})
export class Hero {
  menuAberto = false;
  termoPesquisa = '';
  private readonly router = inject(Router);

  pesquisar() {
    const termo = this.termoPesquisa.trim();

    this.router.navigate(['/produtos'], {
      queryParams: termo ? { busca: termo } : {},
    });
  }
}

