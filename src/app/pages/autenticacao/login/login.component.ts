import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = "";
  password = "";


  constructor(private authService: AuthService, private snackBar: MatSnackBar){

  } 

  onLogin(){
    this.authService.login(
      this.username,
      this.password
    ).subscribe({
      next:() => {
        this.snackBar.open(
          "Login realizado com sucesso!",
          "Fechar",
          {duration: 3000}
        );
      },
      error:() => {
        this.snackBar.open(
          "Credenciais inválidas!",
          "Fechar",
          {duration: 3000}
        );
      }

    })
  }

}
 