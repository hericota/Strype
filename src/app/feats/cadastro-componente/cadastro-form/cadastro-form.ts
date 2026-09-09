import { Component, signal } from '@angular/core';
import { CadastroInterface } from './cadastro-interface';
import { email, form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-cadastro-form',
  styleUrl: './cadastro-form.css',
  templateUrl: './cadastro-form.html',
})
export class CadastroForm {

  constructor(private router: Router) { }

  cadastrarModel = signal<CadastroInterface>({

    nome: '',
    sobreNome: '',
    telefone: null,
    email: '',
    password: '',
    check: false,
    Cpf: null,

  })

  cadastarForm = form(this.cadastrarModel, (schemaPath) => {
    required(schemaPath.email, { message: '*Insira seu email!' });
    email(schemaPath.email, { message: '*Insira um email válido!' });
    required(schemaPath.password, { message: '*Insira uma senha!' });
    minLength(schemaPath.password, 8, { message: '*minimo 8 caracteres' });
    required(schemaPath.check, { message: '*obrigatório' });
    required(schemaPath.nome, { message: '*Insira seu nome' });
    required(schemaPath.sobreNome, { message: '*obrigatório' });
    required(schemaPath.telefone, { message: '*obrigatório' });
     required(schemaPath.Cpf, { message: '*Insira seu Cpf!' });
  })

  cadastrarUser(event: SubmitEvent) {
    event.preventDefault();
    if (this.cadastarForm().invalid()) return;
    console.log('cadastro bem-sucedito!')
    this.cadastrarModel.set({

      nome: '',
      sobreNome: '',
      telefone: null,
      email: '',
      password: '',
      check: false,
      Cpf: null,

    })
    this.cadastarForm().reset();

    this.router.navigate(['/login']);
  }

}
