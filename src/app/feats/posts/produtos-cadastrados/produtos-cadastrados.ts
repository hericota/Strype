import { Component, inject } from '@angular/core';
import { ConsumoApi } from '../consumo-api';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-produtos-cadastrados',
  styleUrl: './produtos-cadastrados.css',
  templateUrl: './produtos-cadastrados.html',
})
export class produtosCadastrados {
  protected readonly consumoService = inject(ConsumoApi);

  protected recarregarPosts(){
    this.consumoService.produtoCadastrado.reload();
  }
}
