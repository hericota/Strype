import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Produto } from './produto';

@Service()
export class ConsumoApi {

    private readonly httpClient = inject(HttpClient);

    private readonly urlApi = 'https://ease-mas-paste-ranking.trycloudflare.com/produtos'

    cadastrarPostService(postCadastrado:Produto){
        return this.httpClient.post<Produto>(this.urlApi , postCadastrado)
    }
    atualizarService(atualizar:Produto){
        return this.httpClient.put<Produto>(this.urlApi , atualizar)
    }

    readonly produtoCadastrado = httpResource<Produto[]>(
        () => this.urlApi,
        {defaultValue:[]}
    )

}
