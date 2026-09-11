import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Produto } from './produto';

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
    deletarPostService(postCadastrado:Produto){
        return this.httpClient.delete<Produto>(this.urlApi+postCadastrado.id)
    }

}
