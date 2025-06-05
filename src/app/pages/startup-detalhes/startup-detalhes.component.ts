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
    console.log(id)
    this.startupService.obterStartups(id).subscribe(data => {

      this.startup = data;
      console.log(data)
    });
  }




currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.startup.imagens.length;
  }


  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.startup.imagens.length) % this.startup.imagens.length;
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
