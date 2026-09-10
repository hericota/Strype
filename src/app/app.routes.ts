import { Routes } from '@angular/router';
import { PostProdutos } from './feats/posts/post-produtos/post-produtos';
import { TelaAdmin } from './feats/tela-admin/tela-admin';
import { Home } from './home/home';
import { CadastroComponente } from './feats/cadastro-componente/cadastro-componente';
import { LoginComponente } from './feats/login-componente/login-componente';
import { Favoritos } from './favoritos/favoritos';
import { DetalheProduto } from './feats/detalhe-produto/detalhe-produto';
import { Deletar } from './feats/deletar/deletar';
import { CarrinhoComponente } from './feats/carrinho-componente/carrinho-componente';
import { produtosCadastrados } from './feats/posts/produtos-cadastrados/produtos-cadastrados';

export const routes: Routes = [
    {path:"telaAdmin", component:TelaAdmin},

    {path:"CadastroProdutos", component:PostProdutos},

    {path:"favoritos", component:Favoritos},

    {path:"deletar", component:Deletar},
    {path:'produtos', component:produtosCadastrados},


    {path: 'Home', component: Home },
    {path: 'cadastro', component: CadastroComponente},
    {path: 'login', component: LoginComponente},
    {path:'produto/:id', component: DetalheProduto},
    {path: 'carrinho', component: CarrinhoComponente},
    {path: '', redirectTo: 'Home', pathMatch: 'full'},
    { path: '**', redirectTo: 'home' }
];
