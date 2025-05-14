import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Observable } from 'rxjs';
import { atuacaoService } from '../../../services/atuacao.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  formStartup! : FormGroup;
  base64Image: string | null = null;
  atuacoes = new Observable<Atuacao[]>();

   constructor(    
    private authService: AuthService, private route: Router, private formBuilder: FormBuilder, private startupService: startupService, private atuacaoService : atuacaoService )
     { 
      this.listarAtuacoes();
     }

    listarAtuacoes(){
      this.atuacoes = this.atuacaoService.listarAtuacoes();
    }

    buildForm(){
      console.log("buildForm...");
      this.formStartup = this.formBuilder.group(
        {
          nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
          descricao: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(500)]],
          metas: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(3000)]],
          cnpj: [null, [Validators.minLength(14), Validators.maxLength(14)]],
          cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
          logradouro: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
          numero: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
          bairro: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
          municipio: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
          uf: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(2)]],
          siteStartup: [null, [ Validators.minLength(0), Validators.maxLength(250)]],
          quantidadeFuncionario: [null, [Validators.required]],
          tipoAtendimento: [null], 
          ticket: [null],
          responsavelCadastro: [null, [ Validators.minLength(0), Validators.maxLength(100)]],
          login: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(30)]], 
          senha: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]], 
          confirmarSenha: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
          atuacoes: [null],
          imagens: [null],
          videos: [null],
          contatos: [null] 
        });     
    }

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

    

    salvarStartup() {
      const dadosFormulario : Startup = this.formStartup.getRawValue();

      this.startupService.adicionarStartup(dadosFormulario).subscribe({
        next: (startup : Startup[]) => {
           this.route.navigate(['/startup/listar'])
      },
        error: (error) => {
          console.error('Erro ao cadastrar startup:', error);
      },
        complete: () => {
          console.log('Cadastro de startup concluído com sucesso!');
      }
      
    });
    }
    
}
