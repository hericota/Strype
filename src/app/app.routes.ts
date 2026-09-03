import { Routes } from '@angular/router';
import { TelaAdmin } from './feats/tela-admin/tela-admin';
import { LoginComponente } from './feats/login-componente/login-componente';

export const routes: Routes = [
{path: 'login', component: LoginComponente},
{path:"telaAdmin", component:TelaAdmin}
];
