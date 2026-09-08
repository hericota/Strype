import { Routes } from '@angular/router';
import { PostProdutos } from './feats/posts/post-produtos/post-produtos';
import { TelaAdmin } from './feats/tela-admin/tela-admin';
import { Home } from './home/home';
import { CadastroComponente } from './feats/cadastro-componente/cadastro-componente';
import { LoginComponente } from './feats/login-componente/login-componente';

export const routes: Routes = [
    {path:"telaAdmin", component:TelaAdmin},
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: Home },
    { path: '**', redirectTo: 'home' },
    {path: 'cadastro', component: CadastroComponente},
    {path: 'login', component: LoginComponente},
];
