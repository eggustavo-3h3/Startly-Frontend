import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { startupService } from '../../services/startup.service';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
     
  constructor(private authService: AuthService, private startupService: startupService) {}
  startups: any;

  ngOnInit() {
    const userId = localStorage.getItem('token');
      if(userId){
        this.startupService.obterStartups(userId).subscribe({
          next: (data) => {
            this.startups =  data;
            console.log(data);
          },
          error: (err) => {
            
          }
      });
  }
  }
}
