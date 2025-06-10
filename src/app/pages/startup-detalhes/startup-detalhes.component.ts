import { Component, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { startupService } from "../../services/startup.service";
import { CommonModule } from "@angular/common";
import { enumTipoCliente } from "../../models/enumTipoAtendimento.model";
import { AtuacaoService } from "../../services/atuacao.service";
import { Observable } from "rxjs";
import { Atuacao } from "../../models/atuacoes.model";

@Component({
  selector: "app-startup-detalhes",
  imports: [CommonModule],
  standalone: true,
  templateUrl: "./startup-detalhes.component.html",
  styleUrl: "./startup-detalhes.component.css",
})
export class StartupDetalhesComponent {
  atuacoes$ = new Observable<Atuacao[]>();
  startup: any;

  listarAtuacao() {
    this.atuacoes$ = this.atuacaoService.listarAtuacoes();
  }

  constructor(
    private route: ActivatedRoute,
    private startupService: startupService,
    private atuacaoService: AtuacaoService,
  ) {
    this.listarAtuacao();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.startupService.obterStartups(id).subscribe((data) => {
      this.startup = data;
      console.log(data);
    });
  }

  menuAberto = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  @HostListener("document:click", ["$event"])
  fecharMenu(event: MouseEvent) {
    const alvo = event.target as HTMLElement;
    const clicouDentro = alvo.closest(".dropdown");
    if (!clicouDentro) {
      this.menuAberto = false;
    }
  }

  getTipoAtendimento(tipo: number) {
    if (tipo == 1) return "Local";
    else if (tipo == 2) return "Nacional";
    else return "Internacional";
  }
}
