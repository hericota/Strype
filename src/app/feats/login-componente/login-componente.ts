import { Component } from '@angular/core';
import { LoginForm } from "./login-form/login-form";
import { RouterLink } from '@angular/router';


@Component({
  imports: [LoginForm, RouterLink],
  selector: 'app-login-componente',
  styleUrl: './login-componente.css',
  templateUrl: './login-componente.html',
})
export class LoginComponente {
  
}
