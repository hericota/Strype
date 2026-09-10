import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsumoApi } from '../posts/consumo-api';
import { Produto } from '../posts/produto';
import { httpResource } from '@angular/common/http';
import { form, FormField } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-detalhe-produto',
  styleUrl: './detalhe-produto.css',
  templateUrl: './detalhe-produto.html',
})
export class DetalheProduto {

  contador = signal(1);
  avaliacao = 4.8;
  tamanhoSelecionado : number | null = null

  contadorForm = form(this.contador);

  // chamando a url dos produtos 
  private readonly urlApi = 'http://localhost:8080/produtos';

  // injetando a rota ativada
  private route = inject(ActivatedRoute);

  // chamando a API
  protected consumoService = inject(ConsumoApi)

  // colocando o valor do ID na variavel id
  id = this.route.snapshot.paramMap.get('id')

  // método get pra chamar o id com a descrição 
  readonly detalheProduto = httpResource<Produto>(
        () => this.urlApi + "/" + this.id
    )

    selecionarTamanho(tamanho: number) {
  this.tamanhoSelecionado = tamanho;
  }
 
  incrementar(){
    this.contador.update(valor => valor + 1) 
  }


}
