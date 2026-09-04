import { Routes } from '@angular/router';
import { PostProdutos } from './feats/posts/post-produtos/post-produtos';
import { TelaAdmin } from './feats/tela-admin/tela-admin';
import { LoginComponente } from './feats/login-componente/login-componente';


export const routes: Routes = [
{path: 'login', component: LoginComponente},
{path:"telaAdmin", component:TelaAdmin},
{path:'CadastroProduto', component:PostProdutos},
  
];
