import { Component } from '@angular/core';
import { Startup } from '../../models/startup.model';
import { startupService } from '../../services/startup.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AtuacaoService } from '../../services/atuacao.service';
import { Atuacao } from '../../models/atuacoes.model';
import { EnumTipoImagem } from '../../models/imagem.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-portifolio',
  templateUrl: './portifolio.component.html',
  styleUrls: ['./portifolio.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class PortifolioComponent {
  //Atributos
  startups$ = new Observable<Startup[]>();
  atuacoes$ = new Observable<Atuacao[]>();

  listarStartups() {
    this.startups$ = this.startupService.listarStartups();

    //Exemplo para tratar retorno do HttpClient
    // this.startups$ = this.startupService.listarStartups().subscribe({
    //   next: (response) => {

    //   },
    //   error: (err) => {

    //   },
    //   complete: () => {

    //   }
    // })
  }

  searchTerm: string = '';

onSearch() {
  console.log('Termo de busca:', this.searchTerm);
  // Faça a lógica de busca aqui (chamada a API, filtro de lista, etc)
}

  listarAtuacao() {
    this.atuacoes$ = this.atuacaoService.listarAtuacoes();
  }

  constructor(private startupService: startupService, private atuacaoService: AtuacaoService) {
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

}
