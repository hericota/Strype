import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ItensInterface } from './itens-interface';
import { CarrinhoService } from './carrinhoService/carrinho-service';
import { CommonModule } from '@angular/common';

@Component({
    imports: [RouterLink,CommonModule], //commonModule faz com q eu consiga padronizar a formatação de valores no html usando o | number:'1.2-2'
    selector: 'app-carrinho-card',
    styleUrl: './carrinho-card.css',
    templateUrl: './carrinho-card.html',
})
export class CarrinhoCard {
    protected carrinhoService =  inject(CarrinhoService);

    carrinho = this.carrinhoService.carrinhoModel;

   //mudei a logica do carrinho para o service !!!

   aumentar(produtoId: number){ //pega a função aumentar que esta no service 
    this.carrinhoService.aumentar(produtoId)
   }

   diminuir(produtoId:number){ //pega a função diminuir que esta no service 
    this.carrinhoService.diminuir(produtoId)
   }

   excluir(produtoId:number){//pega a função excluir que esta no service 
    this.carrinhoService.excluir(produtoId)
   }

  comprar() {
    alert('Parabéns, sua compra foi finalizada!');
    this.carrinhoService.carrinhoModel.set([]); // Limpa o carrinho
}
}
