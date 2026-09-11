import { Component, inject } from '@angular/core';
import { Produto } from '../posts/produto';
import { httpResource } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    imports: [RouterLink],
    selector: 'app-atualizar-produto',
    styleUrl: './atualizar-produto.css',
    templateUrl: './atualizar-produto.html',
})
export class AtualizarProduto {

      private route = inject(ActivatedRoute);
      id = this.route.snapshot.paramMap.get('id')
      private readonly urlApi = 'http://localhost:8080/produtos';
      readonly produtoEspecifico = httpResource<Produto>(
        () => this.urlApi + "/" + this.id
    )
    atualizar(){

    }
}
