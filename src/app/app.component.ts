import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Route, RouterOutlet } from '@angular/router';
import { BaseUiComponent } from './components/base-ui/base-ui.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { startupService } from './services/startup.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatToolbarModule, RouterOutlet, FormsModule, BaseUiComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Startly';
  authService = inject(AuthService);

  startup: any;
  
  constructor(private route: ActivatedRoute, private startupService: startupService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.startupService.obterStartups(id).subscribe(data => {
      this.startup = data;
  });
  }

  logout() {
    this.authService.logout();
  }

  
}
