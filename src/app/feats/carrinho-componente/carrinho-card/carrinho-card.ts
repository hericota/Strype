import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ItensInterface } from './itens-interface';
import { CarrinhoService } from './carrinhoService/carrinho-service';

@Component({
    imports: [RouterLink],
    selector: 'app-carrinho-card',
    styleUrl: './carrinho-card.css',
    templateUrl: './carrinho-card.html',
})
export class CarrinhoCard {
    protected carrinhoService =  inject(CarrinhoService);

    carrinho = this.carrinhoService.carrinhoModel;

    aumentar(produtoId: number) {
        //produtoId é uma variavel que recebe o valor
        //sempre que o botão aumentar é clicado, o valor aumenta mais um item
        this.carrinho.update((itens) =>
            //itens é o array q criei agora, e item é uma variavel q esta dentro dessa array
            itens.map(
                (item) =>
                    //o map cria um novo array a partir da array antiga
                    item.produto.id === produtoId
                        ? { ...item, quantidade: item.quantidade!+ 1 } //Se for igual, cria um objeto novo copiando tudo o que ele já tinha (...item), mas soma +1 na quantidade
                        : item, //Se não for igual (é outro produto do carrinho), deixa o item exatamente como está, sem mexer em nada
            ),
        );
        console.log('Carrinho atualizado:', this.carrinho());
    }

    excluir(produtoId: number) {
        //exclui o item do carrinho
        this.carrinho.update((itens) => itens.filter((item) => item.produto.id !== produtoId));
    }

    //diminui o item do carrinho
    diminuir(produtoId: number) {
        this.carrinho.update((itens) =>
            itens.map((item) =>
                item.produto.id === produtoId ? { ...item, quantidade: item.quantidade! - 1 } : item,
    ))}
            
    
}
