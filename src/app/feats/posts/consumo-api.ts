import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Produto } from './produto';
import { tap } from 'rxjs';

@Service()
export class ConsumoApi {

    private readonly httpClient = inject(HttpClient);

    private readonly urlApi = 'http://localhost:8080/produtos'

    cadastrarPostService(postCadastrado:Produto){
        return this.httpClient.post<Produto>(this.urlApi , postCadastrado)
    }

    readonly produtoCadastrado = httpResource<Produto[]>(
        () => this.urlApi,
        {defaultValue:[]}
    )
    buscarProdutoService(id: () => number | undefined) {
        return httpResource<Produto>(() => {
            const produtoId = id();
            return produtoId === undefined ? undefined : `${this.urlApi}/${produtoId}`;
        });
    }

    atualizarPostService(id: number, produto: Produto) {
        return this.httpClient.put<Produto | null>(`${this.urlApi}/${id}`, produto).pipe(
            tap(() => this.produtoCadastrado.reload())
        );
    }

    deletarPostService(id: number) {
        return this.httpClient.delete<void>(`${this.urlApi}/${id}`).pipe(
            tap(() => {
                if (this.produtoCadastrado.hasValue()) {
                    this.produtoCadastrado.update(produtos => produtos.filter(produto => produto.id !== id));
                }
                this.produtoCadastrado.reload();
            })
        );
    }
    }


