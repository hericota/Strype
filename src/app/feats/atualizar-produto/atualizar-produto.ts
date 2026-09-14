import { CurrencyPipe } from '@angular/common';
import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { form, FormField, min, required } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ConsumoApi } from '../posts/consumo-api';
import { Produto } from '../posts/produto';
import { Header } from '../../components/header/header';

@Component({
  imports: [RouterLink, FormField, CurrencyPipe, Header],
  selector: 'app-atualizar-produto',
  styleUrl: './atualizar-produto.css',
  templateUrl: './atualizar-produto.html',
})
export class AtualizarProduto {
  private readonly consumoService = inject(ConsumoApi);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly parametros = toSignal(inject(ActivatedRoute).paramMap);
  protected readonly id = computed(() => {
    const valor = this.parametros()?.get('id');
    const id = Number(valor);
    return valor && /^\d+$/.test(valor) && Number.isSafeInteger(id) && id > 0 ? id : undefined;
  });
  protected readonly produtoEspecifico = this.consumoService.buscarProdutoService(this.id);
  protected readonly salvando = signal(false);
  protected readonly erro = signal('');
  protected readonly edicaoModel = signal<Produto>({ nome: '', descricao: '', preco: null, urlImagem: '' });
  protected readonly edicaoForm = form(this.edicaoModel, s => {
    required(s.nome);
    required(s.descricao);
    required(s.preco);
    min(s.preco, 0);
    required(s.urlImagem);
  });

  constructor() {
    effect(() => {
      if (this.produtoEspecifico.hasValue()) {
        this.edicaoModel.set({ ...this.produtoEspecifico.value() });
        this.edicaoForm().reset();
      }
      this.erro.set('');
    });
  }

  protected atualizar(event: SubmitEvent) {
    event.preventDefault();
    const id = this.id();
    if (id === undefined || this.salvando() || this.produtoEspecifico.isLoading() || !this.produtoEspecifico.hasValue()) return;

    const modelo = this.edicaoModel();
    const produto: Produto = {
      id,
      nome: modelo.nome.trim(),
      descricao: modelo.descricao.trim(),
      preco: modelo.preco,
      urlImagem: modelo.urlImagem.trim(),
    };
    if (this.edicaoForm().invalid() || !produto.nome || !produto.descricao || !produto.urlImagem ||
        produto.preco === null || !Number.isFinite(produto.preco) || produto.preco < 0) {
      this.erro.set('Preencha todos os campos e informe um preço válido, maior ou igual a zero.');
      return;
    }

    this.erro.set('');
    this.salvando.set(true);
    this.consumoService.atualizarPostService(id, produto).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.salvando.set(false))
    ).subscribe({
      next: () => { void this.router.navigate(['/gerenciar']); },
      error: () => this.erro.set('Não foi possível salvar as alterações. Seus dados foram mantidos; tente novamente.'),
    });
  }
}
