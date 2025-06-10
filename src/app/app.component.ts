import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { BaseUiComponent } from './components/base-ui/base-ui.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { startupService } from './services/startup.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule,MatButtonModule, MatMenuModule, MatToolbarModule, RouterOutlet, FormsModule, BaseUiComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Startly';
  idUsuario: string | null = null;
  authService = inject(AuthService);
  id: any

  startup: any;
  
  constructor(private route: ActivatedRoute, private startupService: startupService, private router: Router) {}

  ngOnInit() {
    this.authService.getId$().subscribe(id => {
      this.idUsuario = id;
    });
    
    if (this.idUsuario) {
      this.startupService.obterStartups(this.idUsuario).subscribe(data => {
        this.startup = data;
      });      
    }
  }

  logout() {
    this.authService.logout();
  }

  goToPerfil() {
    this.router.navigate(['/perfil', this.idUsuario]); // <- envia via path param
  }
}
