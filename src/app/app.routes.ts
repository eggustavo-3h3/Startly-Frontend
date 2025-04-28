import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/autenticacao/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { StartupComponent } from './pages/startup/startup.component';
import { PortifolioComponent } from './pages/portifolio/portifolio.component';
import { PoliticaComponent } from './pages/politica/politica.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent},
  { path: 'sobre', component: SobreComponent },
  { path: 'startup', component: StartupComponent },
  { path: 'portifolio', component: PortifolioComponent },
  { path: 'politica', component: PoliticaComponent },
  { path: 'perfil', component: PerfilComponent },
  


];
