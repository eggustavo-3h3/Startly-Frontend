import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { startupService } from '../../../services/startup.service';
import { Startup } from '../../../models/startup.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Atuacao } from '../../../models/atuacoes.model';
import { Observable, expand } from 'rxjs';
import { AtuacaoService } from '../../../services/atuacao.service';
import { AreaAtuacaoComponent } from '../../../components/area-atuacao/area-atuacao.component';
import { NovaStartup } from '../../../models/nova-startup.model';
import { StartupImagem } from '../../../models/imagem.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatInputModule, MatButtonModule, CommonModule, AreaAtuacaoComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  formStartup!: FormGroup;
  logoBase64Image: string | null = null;
  areaAtuacaoId: string | null = null;
  ticketMedio: string | null = null;
  tipoCliente: string | null = null;

  etapaAtual: number = 1;
  totalEtapas: number = 6;
  
  atuacoes: Atuacao[] = [];

  enumTicketMedio = [
    { id: 1, descricao: '10 a 49' },
    { id: 2, descricao: '50 a 99' },
    { id: 3, descricao: '100+' }
  ]

  enumTipoAtendimento = [
    { id: 1, descricao: 'Estadual' },
    { id: 2, descricao: 'Nacional' },
    { id: 3, descricao: 'Internacional' }
  ]

  atuacoesSelecionadas: Atuacao[] = [];
  atuacaoSelecionadaAdicionar: string | null = null;

  constructor(
    private authService: AuthService, 
    private route: Router, 
    private formBuilder: FormBuilder, 
    private startupService: startupService,
    private atuacaoService: AtuacaoService
  ) {
    this.buildForm();
  }
  ngOnInit(): void {
    this.atuacaoService.listarAtuacoes().subscribe({
      next: (dados) => this.atuacoes = dados,
      error: (erro) => console.error('Erro ao buscar áreas de atuação:', erro)
    });
  }

  proximaEtapa(){
    if (this.etapaAtual < this.totalEtapas) {
      this.etapaAtual++;
    }
  }
  
  etapaAnterior() {
    if (this.etapaAtual > 1) {
      this.etapaAtual--;
    }
  }

  adicionarAtuacao() {
    if (this.atuacaoSelecionadaAdicionar) {
      const atuacao = this.atuacoes.find(a => a.id === this.atuacaoSelecionadaAdicionar);
      if (atuacao && !this.atuacoesSelecionadas.some(a => a.id === atuacao.id)) {
        this.atuacoesSelecionadas.push(atuacao);
      }
      this.atuacaoSelecionadaAdicionar = null;
    }
  }

  removerAtuacao(index: number) {
    this.atuacoesSelecionadas.splice(index, 1);
  }

  onAtuacaoSelecionada(id: string) {
    this.atuacaoSelecionadaAdicionar = id;
  }

  buildForm() {
    this.formStartup = this.formBuilder.group(
      {
        nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
        descricao: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(500)]],
        metas: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(3000)]],
        cnpj: [null, [Validators.minLength(14), Validators.maxLength(14)]],
        cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        logradouro: [null, [Validators.required, Validators.maxLength(100)]],
        numero: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        bairro: [null, [Validators.required, Validators.maxLength(100)]],
        municipio: [null, [Validators.required, Validators.maxLength(100)]],
        uf: [null, [Validators.required, Validators.maxLength(2)]],
        linkedIn: [null, [Validators.maxLength(300)]],
        quantidadeFuncionario: [null, [Validators.required]],
        emailPessoal: [null],
        emailCorporativo: [null, [Validators.required]], 
        telefoneFixo: [null, [Validators.required]], 
        tipoAtendimento: [null],
        ticketMedio: [null],
        responsavelCadastro: [null, [Validators.maxLength(100)]],
        login: [null, [Validators.required, Validators.maxLength(30)]],
        senha: [null, [Validators.required, Validators.maxLength(100)]],
        confirmarSenha: [null, [Validators.required, Validators.maxLength(100)]],
        logo: [null, [Validators.required]],
        urlVideo: [null, [Validators.maxLength(300)]],
        atuacoes: [null],
        imagens: this.formBuilder.array<StartupImagem>([]),
      });
  }

  onFileSelectedLogo(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formStartup.get('logo')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }    
  }

  get imagens() : FormArray {
    return this.formStartup.get('imagens') as FormArray;
  }  

  onFileSelectedPropaganda(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imagemPropaganda = this.formBuilder.group({
            imagem: reader.result as string
          });
          this.imagens.push(imagemPropaganda);
        };
        reader.readAsDataURL(file);
      });
    }    
  }  



  salvarStartup() {
    const dadosStartup = this.formStartup.getRawValue() as Startup;

    console.log("dadosFormulario: ", dadosStartup);

    // Corrige para o tipo esperado no model NovaStartup
    (dadosStartup as any).atuacoes = this.atuacoesSelecionadas.map(a => ({ atuacaoId: a.id }));

    this.startupService.adicionarStartup(dadosStartup).subscribe({
      next: (response: string) => {
        this.route.navigate(['/portifolio']);

        Swal.fire({
          title: "Pont Start",
          html: "Startup Registrada com Sucesso!",
          icon: "success",
          draggable: true
        });
      },
      error: (error) => {      
        const erros: string = error.error.join('<br/>');

        Swal.fire({
          title: "Pont Start",
          html: erros,
          icon: "error",
          draggable: true
        });
      }
    });
  }
}
