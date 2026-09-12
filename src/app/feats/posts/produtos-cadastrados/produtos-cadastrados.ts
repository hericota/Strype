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

  private readonly queryParams = toSignal(this.route.queryParamMap);

  protected readonly produtosFiltrados = computed(() => {
    const termo = (this.queryParams()?.get('q') ?? '').trim().toLowerCase();
    const produtos = this.consumoService.produtoCadastrado.value();

    if (!termo) {
      return produtos;
    }

    return produtos.filter((p) => p.nome?.toLowerCase().includes(termo));
  });

  protected recarregarPosts() {
    this.consumoService.produtoCadastrado.reload();
  }
}