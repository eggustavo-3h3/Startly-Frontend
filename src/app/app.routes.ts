import { Routes } from '@angular/router'; 
import { LoginComponent } from './pages/autenticacao/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TipoServicoListComponent } from './pages/tipo-servico/list/tipo-servico-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'tipo-servico/listar', component: TipoServicoListComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: "/home" }


];
