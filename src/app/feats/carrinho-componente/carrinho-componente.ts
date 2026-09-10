import { Component } from '@angular/core';
import { CarrinhoCard } from "./carrinho-card/carrinho-card";
import { Header } from "../../components/header/header";
import { RouterLink } from "@angular/router";

@Component({
  imports: [CarrinhoCard, Header, RouterLink],
  selector: 'app-carrinho-componente',
  styleUrl: './carrinho-componente.css',
  templateUrl: './carrinho-componente.html',
})
export class CarrinhoComponente {}
