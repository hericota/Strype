import { inject, Service } from '@angular/core';
import { DeleteInterface } from './delete-interface';
import { HttpClient } from '@angular/common/http';

@Service()
export class Deletando {
    private readonly httpClient = inject(HttpClient);
    protected readonly urlapi ="https://jsonplaceholder.typicode.com/posts///";

    cadastrarDelete(deleteCadastrado: DeleteInterface){
    
return this.httpClient.delete(`${this.urlapi}/${deleteCadastrado.id}`)
    }
}