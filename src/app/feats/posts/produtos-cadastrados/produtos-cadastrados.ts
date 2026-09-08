import { Component, inject } from '@angular/core';
import { ConsumoApi } from '../consumo-api';

@Component({
  imports: [],
  selector: 'app-produtos-cadastrados',
  styleUrl: './produtos-cadastrados.css',
  templateUrl: './produtos-cadastrados.html',
})
export class ProdutosCadastrados {
  protected readonly consumoService = inject(ConsumoApi);

  protected recarregarPosts(){
    this.consumoService.produtoCadastrado.reload();
  }
}
