import { Component, inject, signal } from '@angular/core';
import { form, required, FormField } from '@angular/forms/signals';
import { Produto } from '../produto';
import { ConsumoApi } from '../consumo-api';

@Component({
  selector: 'app-post-produtos',
  imports: [FormField],
  templateUrl: './post-produtos.html',
  styleUrl: './post-produtos.css',
})
export class PostProdutos {

  readonly cadastroPost = inject(ConsumoApi)

  cadastroModel = signal<Produto>({
    nome: '',
    descricao: '',
    preco: null,
    urlImagem: ''
  })

  cadastroForm = form(this.cadastroModel, (s)=>{
    required(s.nome, ({message:'Campo obrigatório'}))
    required(s.descricao, ({message:'Campo obrigatório'}))
    required(s.preco, ({message:'Campo obrigatório'}))
    required(s.urlImagem, ({message:'Campo obrigatório'}))
  })

  cadastrarProduto(event: SubmitEvent){
    event.preventDefault();

    const produto = this.cadastroModel();

    this.cadastroPost.cadastrarPostService(produto).subscribe({
      next: (response)=>{
        alert("Nome:" + response.nome)

        this.cadastroModel.set({
          nome: '',
          descricao: '',
          preco: null,
          urlImagem: ''
        });
      
        this.cadastroForm().reset();
      }, 
      error:(error)=>{
        console.error('ERRO AO CADASTRAR:', error);

        alert("Algo deu errado")
      }
    })

    
  }
}
