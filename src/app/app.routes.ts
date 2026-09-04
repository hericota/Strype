import { Routes } from '@angular/router';
import { PostProdutos } from './feats/posts/post-produtos/post-produtos';
import { TelaAdmin } from './feats/tela-admin/tela-admin';
import { Home } from './home/home';

export const routes: Routes = [
    {path:"telaAdmin", component:TelaAdmin},
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: Home },
    { path: '**', redirectTo: 'home' },
];
