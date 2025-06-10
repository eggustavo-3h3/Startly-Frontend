import { Component } from "@angular/core";
import { Startup } from "../../models/startup.model";
import { startupService } from "../../services/startup.service";
import { CommonModule } from "@angular/common";
import { Observable, of } from "rxjs";
import { AtuacaoService } from "../../services/atuacao.service";
import { Atuacao } from "../../models/atuacoes.model";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-portifolio",
  templateUrl: "./portifolio.component.html",
  styleUrls: ["./portifolio.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class PortifolioComponent {
  //Atributos
  startups$ = new Observable<Startup[]>();
  atuacoes$ = new Observable<Atuacao[]>();
  nome: string = "";

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

  buscarStartups() {
    if (!this.nome.trim()) return;

    this.startupService.pesquisarStartups(this.nome.trim()).subscribe({
      next: (dados) => {
        this.startups$ = of(dados); // transforma array em Observable
      },
      error: (err) => {
        console.error("Erro ao buscar startups", err);
      },
    });
  }

  listarAtuacao() {
    this.atuacoes$ = this.atuacaoService.listarAtuacoes();
  }

  constructor(
    private startupService: startupService,
    private atuacaoService: AtuacaoService,
  ) {
    this.listarStartups();
    this.listarAtuacao();
  }
}
