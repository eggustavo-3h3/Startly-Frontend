import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { BaseUiComponent } from './components/base-ui/base-ui.component';
import { PortifolioComponent } from './pages/portifolio/portifolio.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, RouterOutlet, RouterLink, FooterComponent, PerfilComponent, PortifolioComponent, FormsModule,HomeComponent, BaseUiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Startly';
}