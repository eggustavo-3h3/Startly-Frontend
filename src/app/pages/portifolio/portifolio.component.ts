import { Component } from '@angular/core';
import { Startup } from '../../models/startup.model';
import { startupService } from '../../services/startup.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portifolio',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './portifolio.component.html',
  styleUrl: './portifolio.component.css'
})
export class PortifolioComponent {

  startups$ = new Observable<Startup[]>();


  constructor(private startupService: startupService ) {
    this.listarStartups();
  }

   listarStartups() {
   this.startups$ = this.startupService.listarStartups()
    
}
}
