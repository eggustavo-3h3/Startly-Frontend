import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { startupService } from '../../services/startup.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
     
  constructor(private authService: AuthService, private startupService: startupService, private route: ActivatedRoute,  private formBuilder: FormBuilder, ) {}
  startup: any;
  perfilForm!: FormGroup;

  buildForm() {
    this.perfilForm = this.formBuilder.group({
        nome: [null, [ Validators.minLength(2), Validators.maxLength(200)]],
        descricao: [null, [Validators.maxLength(3000)]],
        ticketMedio: [null],
        tipoAtendimento: [null],
        atuacoes: [null],
        metas: [null],
        emailPessoal: [null],
        emailCorporativo: [null], 
        telefoneFixo: [null], 
        quantidadeFuncionarios: [null],
        logo: [null],
        urlVideo: [null],
        imagens: [null]
    })
  }
  atualizarStartup() {
    const startupData = this.perfilForm.value;
    this.startupService.atualizarStartup(startupData).subscribe({
      next: (response) => {
        console.log('Startup atualizada com sucesso!');
      },
      error: (error) => {
        console.log('Erro ao atualizar startup.');
      }
    });
  }


  ngOnInit() {
  
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.startupService.obterStartups(id).subscribe(data => {

      this.startup = data;
      console.log(data)
    });
  }
}

