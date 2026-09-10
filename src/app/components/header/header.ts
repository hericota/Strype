import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  menuAberto = false;

toggleMenu() {
    this.menuAberto = !this.menuAberto;
}
}
