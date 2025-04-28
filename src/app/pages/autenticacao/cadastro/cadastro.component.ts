import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { startupService } from '../../../services/startup.service';
import { Startup } from '../../../models/startup.model';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  formStartup! : FormGroup;

   constructor(    
    private authService: AuthService,
    private route: Router,
    private formBuilder: FormBuilder,
    private startupService: startupService ) { }

    buildForm(){
      this.formStartup = this.formBuilder.group(
        {
          nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
          descricao: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(2000)]],
          metas: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(3000)]],
          CNPJ: [null, [Validators.minLength(14), Validators.maxLength(14)]],
          cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
          logradouro: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
          numero: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
          bairro: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
          municipio: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
          UF: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(2)]],
          siteStartup: [null, [ Validators.minLength(0), Validators.maxLength(250)]],
          quantidadeFuncionario: [null, [Validators.required]],
          tipoAtendimento: [''], //é enum não sei como fazer
          ticket: [0],//é enum não sei como fazer
          responsavelCadastro: [null, [ Validators.minLength(0), Validators.maxLength(100)]],
          Login: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(30)]], 
          senha: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]], 
          confirmarSenha: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
          atuacoes: [''],//chave estrangeira
          Imagens: [''],//chave estrangeira
          videos: [''],//chave estrangeira
          Contatos: [''] //chave estrangeira
        });     
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
