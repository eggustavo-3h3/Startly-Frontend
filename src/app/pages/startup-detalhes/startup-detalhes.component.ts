import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { startupService } from '../../services/startup.service';

@Component({
  selector: 'app-startup-detalhes',
  imports: [],
  standalone: true,
  templateUrl: './startup-detalhes.component.html',
  styleUrl: './startup-detalhes.component.css'
})
export class StartupDetalhesComponent {
  startup: any;

  constructor(private route: ActivatedRoute, private startupService: startupService) {}

  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id');
    this.startupService.obterStartups(id).subscribe(data => {

      this.startup = data;
      console.log(data)
    });
  }
}
