import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConsumoApi } from '../posts/consumo-api';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-pesquisa',
  standalone: true,
  styleUrl: './pesquisa.css',
  templateUrl: './pesquisa.html',
})
export class Pesquisa {
  termo = '';

  
  constructor(protected consumoService: ConsumoApi) {}

  get resultados() {
    const termo = this.termo.trim().toLowerCase();
    const produtos = this.consumoService.produtoCadastrado.value();

    if (termo === '') {
      return [];
    }

   
    return produtos.filter(
      (p) =>
        p.nome?.toLowerCase().includes(termo) ||
        p.descricao?.toLowerCase().includes(termo)
    );
  }
}