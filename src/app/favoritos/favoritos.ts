import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FavoritosInterface } from './favoritos-interface';


@Component({
  selector: 'app-favoritos',
  imports: [DecimalPipe],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})

export class Favoritos {
  produtos = signal<FavoritosInterface[]>([
    { id: 1, nome: "Tênis Nike Air Force 1'07", imagem: '', precoDe: 958.90, precoPor: 800.99, precoPix: 712.99, selecionado: false },
    { id: 2, nome: "Tênis Nike Air Force 1'07", imagem: '', precoDe: 958.90, precoPor: 800.99, precoPix: 712.99, selecionado: true },
    { id: 3, nome: "Tênis Nike Air Force 1'07", imagem: '', precoDe: 958.90, precoPor: 800.99, precoPix: 712.99, selecionado: false },
    { id: 4, nome: "Tênis Nike Air Force 1'07", imagem: '', precoDe: 958.90, precoPor: 800.99, precoPix: 712.99, selecionado: true },
  ]);

  private selecionados = computed(() => this.produtos().filter(p => p.selecionado));

  total = computed(() => this.selecionados().reduce((total, p) => total + p.precoPix, 0));
  temSelecionado = computed(() => this.selecionados().length > 0);
  todosSelecionados = computed(() =>
    this.produtos().length > 0 && this.selecionados().length === this.produtos().length
  );
  algunsSelecionados = computed(() =>
    this.temSelecionado() && !this.todosSelecionados()
  );

  toggleSelecionado(id: number)  {
    this.produtos.update(lista =>
      lista.map(p => (p.id === id ? { ...p, selecionado: !p.selecionado } : p))
    );
  }

  selecionarTodos(valor: boolean)  {
    this.produtos.update(lista => lista.map(p => ({ ...p, selecionado: valor })));
  }

  excluirSelecionados() {
    this.produtos.update(lista => lista.filter(p => !p.selecionado));
  }

  comprar(){
    console.log('Comprar:', this.selecionados());
  }
}