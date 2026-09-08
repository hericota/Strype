import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  imports: [CommonModule],
  selector: 'app-favoritos',
  styleUrl: './favoritos.css',
  templateUrl: './favoritos.html',
})
export class Favoritos {
  produtos = signal([
    { nome: 'Tênis Nike', precoDe: 299.9, precoPor: 199.9, selecionado: false },
    { nome: 'Camiseta', precoDe: 89.9, precoPor: 59.9, selecionado: false },
    { nome: 'Boné', precoDe: 49.9, precoPor: 29.9, selecionado: false },
  ]);

  toggleSelecionado(produtoClicado: any) {
    this.produtos.update((lista) =>
      lista.map((p) =>
        p.nome === produtoClicado.nome ? { ...p, selecionado: !p.selecionado } : p,
      ),
    );
  }

  total = computed(() => {
    return this.produtos()
      .filter((p) => p.selecionado)
      .reduce((soma, p) => soma + p.precoPor, 0);
  });

  selecionarTodos(marcar: boolean) {
    this.produtos.update((lista) => lista.map((p) => ({ ...p, selecionado: marcar })));
  }
  excluirSelecionados() {
  this.produtos.update(lista => lista.filter(p => !p.selecionado));
}
}
