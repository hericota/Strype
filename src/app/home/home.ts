import { Component } from '@angular/core';
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import { Hero } from '../components/hero/hero';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Header, Footer, Hero, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
