import { Component } from '@angular/core';
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import { Hero } from '../components/hero/hero';

@Component({
  imports: [Header, Footer, Hero],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
