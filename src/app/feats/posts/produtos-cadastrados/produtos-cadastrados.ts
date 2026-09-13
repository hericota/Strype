import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConsumoApi } from '../consumo-api';

@Component({
  imports: [RouterLink],
  selector: 'app-produtos-cadastrados',
  styleUrl: './produtos-cadastrados.css',
  templateUrl: './produtos-cadastrados.html',
})
export class produtosCadastrados {
  protected readonly consumoService = inject(ConsumoApi);
  private readonly route = inject(ActivatedRoute);

  protected readonly termoPesquisa = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  protected readonly produtosFiltrados = computed(() => {
    const produtos = this.consumoService.produtoCadastrado.value();

    const termo =
      this.termoPesquisa().get('busca')?.trim().toLowerCase() ?? '';

    if (!termo) {
      return produtos;
    }

    return produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termo)
    );
  });

  protected recarregarPosts() {
    this.consumoService.produtoCadastrado.reload();
  }
}