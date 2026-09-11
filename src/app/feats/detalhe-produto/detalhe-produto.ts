import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConsumoApi } from '../posts/consumo-api';
import { Produto } from '../posts/produto';
import { httpResource } from '@angular/common/http';
import { form, FormField } from '@angular/forms/signals';
import { CarrinhoService } from '../carrinho-componente/carrinho-card/carrinhoService/carrinho-service';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-detalhe-produto',
  styleUrl: './detalhe-produto.css',
  templateUrl: './detalhe-produto.html',
})
export class DetalheProduto {

  contador = signal(1);
  avaliacao = 4.8;
  tamanhoSelecionado : number | null = null

  protected consumoService = inject(ConsumoApi)

  contadorForm = form(this.contador);

  // chamando a url dos produtos 
  private readonly urlApi = 'http://localhost:8080/produtos';

  // injetando a rota ativada
  private route = inject(ActivatedRoute);

  // chamando a API
  protected carrinhoService = inject(CarrinhoService)

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
    this.contador.update(valor => valor + 1);
  }

  decrementar(){
    this.contador.update(valor => valor - 1);
  }

  
  adicionarCarrinho(){
    const produto = this.detalheProduto.value();
    alert("clicado")
    if(produto){
      console.log("nnkknk")
      this.carrinhoService.carrinhoModel.update(itens => [... itens , {
        produto:produto,
        quantidade: this.contador()
      }])
    }


  }

}
