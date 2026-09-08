import { Component } from '@angular/core';
import { CadastroForm } from "./cadastro-form/cadastro-form";

@Component({
  imports: [CadastroForm],
  selector: 'app-cadastro-componente',
  styleUrl: './cadastro-componente.css',
  templateUrl: './cadastro-componente.html',
})
export class CadastroComponente {}
