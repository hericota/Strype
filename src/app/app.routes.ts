import { Routes } from '@angular/router';
import { PostProdutos } from './feats/posts/post-produtos/post-produtos';
import { TelaAdmin } from './feats/tela-admin/tela-admin';
import { Home } from './home/home';
import { Favoritos } from './favoritos/favoritos';

export const routes: Routes = [
    {path:"telaAdmin", component:TelaAdmin},

    {path:"produtos", component:PostProdutos},

    {path:"favoritos", component:Favoritos},



    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: Home },
    { path: '**', redirectTo: 'home' },
];
