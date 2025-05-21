import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { startupService } from '../../services/startup.service';
import { Startup } from '../../models/startup.model';
import { EnumTipoImagem } from '../../models/imagem.model';

@Component({
  selector: 'app-startup-detalhes',
  imports: [],
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
    getCarrosselImagens(startup: Startup) {
      return startup.imagens.filter(img => img.tipoImagem == EnumTipoImagem.Propaganda).map(img => `data:image/jpg;base64,${img.imagem}`);
    }
      getLogo(startup: Startup) {
        
    const img = startup.imagens.find(img => img.tipoImagem == EnumTipoImagem.Logo);
    return img ? `data:image/jpg;base64,${img.imagem}` : null;
  }
  
   images = [
    'https://picsum.photos/id/1015/900/500',
    'https://picsum.photos/id/1016/900/500',
    'https://picsum.photos/id/1018/900/500',
  ];

  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
