import { Component, signal } from '@angular/core';
import { LoginInterface } from './login-interface';
import { email, form, minLength, required, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {

  constructor(private router: Router) {}
  desabilitado = signal(false);

  usuarioModel = signal<LoginInterface>({
    email: '',
    password: '',
    checkbox: false,
  });

  usuarioForm = form(this.usuarioModel, (schemaPath) => {
    required(schemaPath.email, { message: '*Insira seu email!' });
    email(schemaPath.email, { message: '*Insira um email válido!' });
    required(schemaPath.password, { message: '*Insira uma senha!' });
    minLength(schemaPath.password, 8, { message: '*minimo 8 caracteres' });
    required(schemaPath.checkbox, { message: '*obrigatorio' });
  });

  entrarUsuario(event: SubmitEvent) {
    event.preventDefault();
    if (this.usuarioForm().invalid()) return;
    console.log('login bem-sucedido!');
    this.router.navigate(['/Home']); /*deve direcionar para a pagina de comprar*/
    this.usuarioModel.set({ email: '', password: '', checkbox: false })
    this.usuarioForm().reset();
  }
}
