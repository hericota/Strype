import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ItensInterface } from './itens-interface';

@Component({
    imports: [RouterLink],
    selector: 'app-carrinho-card',
    styleUrl: './carrinho-card.css',
    templateUrl: './carrinho-card.html',
})
export class CarrinhoCard {
    carrinho = signal<ItensInterface[]>([
        {
            produto: {
                id: 1,
                nome: 'Camiseta Angular',
                descricao: 'Camiseta confortável para programar',
                preco: 59.9,
                urlImagem: 'https://imgnike-a.akamaihd.net/360x360/058889IEA2.jpg',
            },
            quantidade: 1,
        },
        {
            produto: {
                id: 2,
                nome: 'Caneca TypeScript',
                descricao: 'Caneca de cerâmica 350ml',
                preco: 35.0,
                urlImagem: 'https://imgnike-a.akamaihd.net/360x360/058889IEA2.jpg',
            },
            quantidade: 1,
        },
        {
            produto: {
                id: 3,
                nome: 'Moletom Developer',
                descricao: 'Moletom quentinho para dias frios',
                preco: 120.0,
                urlImagem: 'https://imgnike-a.akamaihd.net/360x360/058889IEA2.jpg',
            },
            quantidade: 1,
        },
    ]); //cria uma array de teste e pega a interface dos produtos

    aumentar(produtoId: number) {
        //produtoId é uma variavel que recebe o valor
        //sempre que o botão aumentar é clicado, o valor aumenta mais um item
        this.carrinho.update((itens) =>
            //itens é o array q criei agora, e item é uma variavel q esta dentro dessa array
            itens.map(
                (item) =>
                    //o map cria um novo array a partir da array antiga
                    item.produto.id === produtoId
                        ? { ...item, quantidade: item.quantidade + 1 } //Se for igual, cria um objeto novo copiando tudo o que ele já tinha (...item), mas soma +1 na quantidade
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
                item.produto.id === produtoId ? { ...item, quantidade: item.quantidade - 1 } : item,
    ))}
            
    
}
