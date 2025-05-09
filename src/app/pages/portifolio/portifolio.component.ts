import { Component } from '@angular/core';
import { Startup } from '../../models/startup.model';
import { startupService } from '../../services/startup.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { atuacaoService } from '../../services/atuacao.service';
import { Atuacao } from '../../models/atuacoes.model';
import { EnumTipoImagem } from '../../models/imagem.model';

@Component({
  selector: 'app-portifolio',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './portifolio.component.html',
  styleUrl: './portifolio.component.css'
})
export class PortifolioComponent {


  startups$ = new Observable<Startup[]>();
  atuacoes$ = new Observable<Atuacao[]>();

  listarStartups() {
    this.startups$ = this.startupService.listarStartups();
  }

  listarAtuacao() {
    this.atuacoes$ = this.atuacaoService.listarAtuacoes();
  }

  constructor(private startupService: startupService, private atuacaoService: atuacaoService) {
    this.listarStartups();
    this.listarAtuacao();
  }

  getLogo(startup: Startup) {
    const img = startup.imagens.find(img => img.tipoImagem == EnumTipoImagem.Logo);
    return img ? `data:image/jpg;base64,${img.imagem}` : null;
  }
   
  //Metodo para trazer as imagens do tipo propaganda para o carrosel no perfil
  getCarrosselImagens(startup: Startup) {
    return startup.imagens.filter(img => img.tipoImagem == EnumTipoImagem.Propaganda).map(img => `data:image/jpg;base64,${img.imagem}`);
  }

  //Transformar Imagem em texto e Vice Versa
  base64Image: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.base64Image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

}
