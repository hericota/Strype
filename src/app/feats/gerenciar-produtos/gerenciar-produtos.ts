import { Component, inject } from '@angular/core';
import { ConsumoApi } from '../posts/consumo-api';
import { RouterLink } from '@angular/router';

@Component({
    imports: [RouterLink],
    selector: 'app-gerenciar-produtos',
    styleUrl: './gerenciar-produtos.css',
    templateUrl: './gerenciar-produtos.html',
})
export class GerenciarProdutos {
    protected readonly consumoService = inject(ConsumoApi);
}
