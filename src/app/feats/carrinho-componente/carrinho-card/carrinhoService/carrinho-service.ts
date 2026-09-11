import {  Service, signal} from '@angular/core';
import { ItensInterface } from '../itens-interface';


@Service()
export class CarrinhoService {

    //cria uma array de teste e pega a interface dos produtos
    carrinhoModel= signal<ItensInterface[]>([]); 

}
