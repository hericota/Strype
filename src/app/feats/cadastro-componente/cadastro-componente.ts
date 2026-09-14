import { Component } from '@angular/core';
import { CadastroForm } from "./cadastro-form/cadastro-form";
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';

@Component({
  imports: [CadastroForm, RouterLink, Header],
  selector: 'app-cadastro-componente',
  styleUrl: './cadastro-componente.css',
  templateUrl: './cadastro-componente.html',
})
export class CadastroComponente {}
