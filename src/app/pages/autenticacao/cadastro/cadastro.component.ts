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

  onAtuacaoSelecionada(id: string) {
    this.areaAtuacaoId = id;
  }

  buildForm() {
    console.log("buildForm...");
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
        municipio: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
        uf: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        siteStartup: [null, [Validators.maxLength(250)]],
        quantidadeFuncionario: [null, [Validators.required]],
        emailPessoal: [null, [Validators.required]], //adicionei esse
        emailCorporativo: [null, [Validators.required]], //adicionei esse
        telefone: [null, [Validators.required]], //adicionei esse
        tipoAtendimento: [null],
        ticketMedio: [null],
        responsavelCadastro: [null, [Validators.minLength(0), Validators.maxLength(100)]],
        login: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(30)]],
        senha: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
        confirmarSenha: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
        logo: [null, [Validators.required]],
        atuacoes: [null],
        imagens: this.formBuilder.array<StartupImagem>([]),
        // videos: [null],
        contatos: [null]
      });
  }

  onFileSelectedLogo(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        //this.formStartup.get('imagens.imagem')?.setValue(reader.result as string); 
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

    const startup = {
    //   login: this.formStartup.value.login, 
    //   nome: this.formStartup.value.nome,
    //   descricao: this.formStartup.value.descricao,
    //   metas: this.formStartup.value.metas,
    //   cnpj: this.formStartup.value.cnpj,
    //   siteStartup: this.formStartup.value.siteStartup,
    //   telefone: this.formStartup.value.telefone,
    //   cep: this.formStartup.value.cep,
    //   emailCorporativo: this.formStartup.value.emailCorporativo,
    //   emailPessoal: this.formStartup.value.emailPessoal,
    //   quantidadeFuncionario: this.formStartup.value.quantidadeFuncionario,
    //   responsavelCadastro: this.formStartup.value.responsavelCadastro,
    //   logradouro: this.formStartup.value.logradouro,
    //   numero: this.formStartup.value.numero,
    //   municipio: this.formStartup.value.municipio,
    //   senha: this.formStartup.value.senha,
    //   confirmarSenha: this.formStartup.value.confirmarSenha,      
      
    //   atuacoes: [ 
    //     {
    //       atuacaoId: this.areaAtuacaoId! 
    //     }
    //   ],
    //   imagens: [
    //     {
    //       tipoImagem: EnumTipoImagem.Logo,
    //       imagem: this.logoBase64Image ?? ""
    //     }
    //   ]
     };

    // console.clear();
    // console.log("novaStartup: ", JSON.stringify(startup, null, 2));

    this.startupService.adicionarStartup(dadosStartup).subscribe({
      next: (response: string) => {
        this.route.navigate(['/startup/listar'])
        console.log('Startup cadastrada com sucesso:', response);
        console.log('Cadastro de startup concluído com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao cadastrar startup:', error);
      },
      complete: () => {
        console.log('Finalizado!');
      }
    });
  }
}
