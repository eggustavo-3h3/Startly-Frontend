import { Routes } from '@angular/router';
import { LoginComponent } from './pages/autenticacao/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { StartupComponent } from './pages/startup/startup.component';
import { PortifolioComponent } from './pages/portifolio/portifolio.component';
import { PoliticaComponent } from './pages/politica/politica.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CadastroComponent } from './pages/autenticacao/cadastro/cadastro.component';
import { AuthGuard } from './guards/auth.guard';
import { StartupDetalhesComponent } from './pages/startup-detalhes/startup-detalhes.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent},
  { path: 'sobre', component: SobreComponent },
  { path: 'startup', component: StartupComponent },
  { path: 'portifolio', component: PortifolioComponent },
  { path: 'politica', component: PoliticaComponent },
  { path: 'perfil', component: PerfilComponent },
<<<<<<< HEAD
  { path: 'cadastro', component: CadastroComponent }, //canActivate: [AuthGuard]},
=======
  { path: 'cadastro', component: CadastroComponent}, //  canActivate: [AuthGuard]
>>>>>>> e19c4469761ed0e8d1790562c28c634cd27c78d9
  { path: 'startup/:id', component: StartupDetalhesComponent},
  
];
