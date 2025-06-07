import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { startupService } from "../../services/startup.service";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import Swal from "sweetalert2";
import { Startup } from "../../models/startup.model";

@Component({
  selector: "app-perfil",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: "./perfil.component.html",
  styleUrl: "./perfil.component.css",
})
export class PerfilComponent {
  constructor(
    private authService: AuthService,
    private startupService: startupService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  startup: any;
  perfilForm!: FormGroup;
  tipoCliente: string | null = null;

  enumTipoAtendimento = [
    { id: 1, descricao: "Estadual" },
    { id: 2, descricao: "Nacional" },
    { id: 3, descricao: "Internacional" },
  ];

  buildForm() {
    this.perfilForm = this.formBuilder.group({
      nome: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      descricao: [null, [Validators.maxLength(3000)]],
      ticketMedio: [null],
      tipoAtendimento: [null],
      atuacoes: [null],
      metas: [null, [Validators.minLength(100), Validators.maxLength(3000)]],
      emailPessoal: [null],
      emailCorporativo: [null],
      telefoneFixo: [null],
      quantidadeFuncionarios: [null],
      logo: [null],
      urlVideo: [null],
      imagens: [null],
    });
  }
  atualizarStartup() {
    const startupData = this.perfilForm.value as Startup;
    this.startupService.atualizarStartup(startupData).subscribe({
      next: (response) => {
        Swal.fire({
          title: "PontStart",
          html: "Startup Atualizada com Sucesso!",
          icon: "success",
          draggable: true,
        });
      },
      error: (error) => {
        const erros: string = error.error.join("<br/>");

        Swal.fire({
          title: "PontStart",
          html: erros,
          icon: "error",
          draggable: true,
        });
      },
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    console.log(id);
    this.startupService.obterStartups(id).subscribe((data) => {
      this.startup = data;
      console.log(data);
    });
  }
}
