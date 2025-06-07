import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { startupService } from '../../services/startup.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-startup-detalhes',
  imports: [CommonModule],
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
    });
  }

  menuAberto = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  @HostListener('document:click', ['$event'])
  fecharMenu(event: MouseEvent) {
    const alvo = event.target as HTMLElement;
    const clicouDentro = alvo.closest('.dropdown');
    if (!clicouDentro) {
      this.menuAberto = false;
    }
  }
}
