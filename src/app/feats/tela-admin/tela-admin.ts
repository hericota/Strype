import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Header } from '../../components/header/header';

@Component({
  imports: [RouterLink, Header],
  selector: 'app-tela-admin',
  styleUrl: './tela-admin.css',
  templateUrl: './tela-admin.html',
})
export class TelaAdmin {}
