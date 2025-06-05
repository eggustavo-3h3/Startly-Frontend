import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { startupService } from '../../services/startup.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
     
  constructor(private authService: AuthService, private startupService: startupService, private route: ActivatedRoute) {}
  startup: any;

  // ngOnInit() {
  
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.startupService.obterStartups(id).subscribe(data => {

  //     this.startup = data;
  //     console.log(data)
  //   });
  // }
}

