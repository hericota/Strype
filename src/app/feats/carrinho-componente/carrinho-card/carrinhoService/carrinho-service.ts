import { computed, Service, signal } from '@angular/core';
import { ItensInterface } from '../itens-interface';

@Service()
export class CarrinhoService {
    //cria uma array de teste e pega a interface dos produtos
    carrinhoModel = signal<ItensInterface[]>([
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
    ]);

    aumentar(produtoId: number) {
        //produtoId é uma variavel que recebe o valor
        //sempre que o botão aumentar é clicado, o valor aumenta mais um item
        this.carrinhoModel.update((itens) =>
            //itens é o array q criei agora, e item é uma variavel q esta dentro dessa array
            itens.map(
                (item) =>
                    //o map cria um novo array a partir da array antiga
                    item.produto.id === produtoId
                        ? { ...item, quantidade: item.quantidade! + 1 } //Se for igual, cria um objeto novo copiando tudo o que ele já tinha (...item), mas soma +1 na quantidade
                        : item, //Se não for igual (é outro produto do carrinho), deixa o item exatamente como está, sem mexer em nada
            ),
        );
        console.log('Carrinho atualizado:', this.carrinhoModel());
    }

    excluir(produtoId: number) {
        //exclui o item do carrinho
        this.carrinhoModel.update((itens) => itens.filter((item) => item.produto.id !== produtoId));
    }

    //diminui o item do carrinho
    diminuir(produtoId: number) {
        this.carrinhoModel.update((itens) =>
            itens.map((item) =>
                item.produto.id === produtoId
                    ? { ...item, quantidade: item.quantidade! - 1 }
                    : item,
            ),
        );
    }
    //-----------------------------

    //computed calcula automaticamente o valor, já o reduce passa por cada item do array somando o preço e a quantidade
    // Toda vez que o carrinho mudar (adicionar, remover, aumentar), o subtotal refaz o cálculo na mesma hora.
    precoProduto = computed(() => this.carrinhoModel().reduce((acumulador, item) => acumulador + (item.produto.preco! * item.quantidade!),0))

    descontoPix = computed(()=> this.precoProduto() * 0.10) //10% de desconto no pix somado com o preço do produto

    desconto = computed(()=> {
        if(this.precoProduto()>= 900){ //se o valor for acima de 900 o usuario ganha 100 reais de desconto
            return 100;
        }
        return 0;
    })

    //aplica os descontos 
    precoFinal = computed(() => this.precoProduto() - this.desconto() - this.descontoPix());


}

