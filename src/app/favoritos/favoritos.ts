import { httpResource } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type ProdutoApi = {
  id?: number;
  nome: string;
  descricao: string;
  preco: number | null;
  urlImagem: string;
};

type ProdutoFavorito = {
  id: number;
  nome: string;
  descricao: string;
  preco: number | null;
  urlImagem: string;
  selecionado: boolean;
};

@Component({
  selector: 'app-favoritos',
  imports: [DecimalPipe],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  private readonly urlApi = 'http://localhost:8080/produtos';

  private readonly chaveFavoritos = 'strype-favoritos';

  private readonly produtosDaApi = httpResource<ProdutoApi[]>(
    () => this.urlApi,
    { defaultValue: [] },
  );

  private readonly idsFavoritos = signal<number[]>(
    this.lerIdsFavoritos(),
  );

  private readonly idsSelecionados = signal<number[]>([]);

  produtos = computed<ProdutoFavorito[]>(() => {
    const idsSalvos = this.idsFavoritos();
    const idsSelecionados = this.idsSelecionados();

    return this.produtosDaApi
      .value()
      .filter(
        (produto): produto is ProdutoApi & { id: number } =>
          produto.id !== undefined &&
          idsSalvos.includes(produto.id),
      )
      .map((produto) => ({
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        urlImagem: produto.urlImagem,
        selecionado: idsSelecionados.includes(produto.id),
      }));
  });

  private readonly selecionados = computed(() => {
    return this.produtos().filter((produto) => produto.selecionado);
  });

  total = computed(() => {
    return this.selecionados().reduce(
      (total, produto) => total + (produto.preco ?? 0),
      0,
    );
  });

  temSelecionado = computed(() => {
    return this.selecionados().length > 0;
  });

  todosSelecionados = computed(() => {
    return (
      this.produtos().length > 0 &&
      this.selecionados().length === this.produtos().length
    );
  });

  algunsSelecionados = computed(() => {
    return this.temSelecionado() && !this.todosSelecionados();
  });

  toggleSelecionado(id: number): void {
    this.idsSelecionados.update((ids) => {
      if (ids.includes(id)) {
        return ids.filter((idSelecionado) => idSelecionado !== id);
      }

      return [...ids, id];
    });
  }

  selecionarTodos(valor: boolean): void {
    if (valor) {
      this.idsSelecionados.set(
        this.produtos().map((produto) => produto.id),
      );

      return;
    }

    this.idsSelecionados.set([]);
  }

  excluirSelecionados(): void {
    const idsSelecionados = this.idsSelecionados();

    const novosIdsFavoritos = this.idsFavoritos().filter(
      (id) => !idsSelecionados.includes(id),
    );

    this.salvarIdsFavoritos(novosIdsFavoritos);
    this.idsSelecionados.set([]);
  }

  comprar(): void {
    console.log(
      'Produtos selecionados para compra:',
      this.selecionados(),
    );
  }

  private lerIdsFavoritos(): number[] {
    const dadosSalvos = localStorage.getItem(this.chaveFavoritos);

    if (!dadosSalvos) {
      return [];
    }

    try {
      const ids = JSON.parse(dadosSalvos);

      if (!Array.isArray(ids)) {
        return [];
      }

      return ids.filter(
        (id): id is number => typeof id === 'number',
      );
    } catch {
      return [];
    }
  }

  private salvarIdsFavoritos(ids: number[]): void {
    const idsSemDuplicados = [...new Set(ids)];

    localStorage.setItem(
      this.chaveFavoritos,
      JSON.stringify(idsSemDuplicados),
    );

    this.idsFavoritos.set(idsSemDuplicados);
  }
}