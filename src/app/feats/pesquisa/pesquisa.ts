import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConsumoApi } from '../posts/consumo-api';

@Component({
  imports: [RouterLink],
  selector: 'app-pesquisa',
  standalone: true,
  styleUrl: './pesquisa.css',
  templateUrl: './pesquisa.html',
})
export class Pesquisa {
  termo = '';

  constructor(
    private route: ActivatedRoute,
    private consumoService: ConsumoApi
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.termo = (params.get('q') ?? '').trim();
    });
  }

  get resultados() {
    const termo = this.termo.toLowerCase();
    const produtos = this.consumoService.produtoCadastrado.value();

    if (termo === '') {
      return [];
    }

    return produtos.filter(
      (p) =>
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo)
    );
  }
}