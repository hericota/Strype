import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConsumoApi } from '../posts/consumo-api';
import { Header } from '../../components/header/header';

@Component({
  imports: [FormsModule, RouterLink, Header],
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
      return produtos;
    }

    return produtos.filter(
      (p) =>
        p.nome?.toLowerCase().includes(termo) ||
        p.descricao?.toLowerCase().includes(termo)
    );
  }
}