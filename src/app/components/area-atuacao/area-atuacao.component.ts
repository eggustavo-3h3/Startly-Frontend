import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Atuacao } from '../../models/atuacoes.model';
import { AtuacaoService } from '../../services/atuacao.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-atuacao',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './area-atuacao.component.html',
  styleUrl: './area-atuacao.component.css'
})
export class AreaAtuacaoComponent implements OnInit {
  atuacoes: Atuacao[] = [];
  atuacaoSelecionadaId: string | null = null;

  @Output() atuacaoSelecionada = new EventEmitter<string>();

  constructor(private atuacaoService: AtuacaoService) {}

  ngOnInit(): void {
    this.atuacaoService.listarAtuacoes().subscribe({
      next: (dados) => this.atuacoes = dados,
      error: (erro) => console.error('Erro ao buscar áreas de atuação:', erro)
    });
  }

  onSelecionar(id: string) {
    this.atuacaoSelecionadaId = id;
    this.atuacaoSelecionada.emit(id);
  }
}
