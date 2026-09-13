import { CurrencyPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ConsumoApi } from '../posts/consumo-api';
import { Produto } from '../posts/produto';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-gerenciar-produtos',
  styleUrl: './gerenciar-produtos.css',
  templateUrl: './gerenciar-produtos.html',
})
export class GerenciarProdutos {
  protected readonly consumoService = inject(ConsumoApi);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly pesquisa = signal('');
  protected readonly excluindoId = signal<number | null>(null);
  protected readonly erro = signal('');
  protected readonly mensagem = signal('');

  protected readonly produtosFiltrados = computed(() => {
    const recurso = this.consumoService.produtoCadastrado;
    const produtos = recurso.hasValue() ? recurso.value() : [];
    const termo = this.pesquisa().trim().toLowerCase();
    return produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo) || String(produto.id ?? '').includes(termo)
    );
  });

  protected excluirProduto(produto: Produto) {
    if (produto.id == null || this.excluindoId() !== null) return;
    if (!window.confirm(`Excluir o produto "${produto.nome}" (ID ${produto.id})? Esta ação não pode ser desfeita.`)) return;

    this.erro.set('');
    this.mensagem.set('');
    this.excluindoId.set(produto.id);
    this.consumoService.deletarPostService(produto.id).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.excluindoId.set(null))
    ).subscribe({
      next: () => this.mensagem.set(`Produto "${produto.nome}" excluído com sucesso.`),
      error: () => this.erro.set('Não foi possível excluir o produto. Tente novamente.'),
    });
  }
}
