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
  perfilForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private startupService: startupService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.perfilForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.minLength(2), Validators.maxLength(200)]],
      descricao: [null, [Validators.maxLength(3000)]],
      ticketMedio: [null],
      tipoAtendimento: [null],
      metas: [null, [Validators.minLength(100), Validators.maxLength(3000)]],
      emailPessoal: [null],
      emailCorporativo: [null],
      telefoneFixo: [null],
      quantidadeFuncionario: [null],
      logo: [null],
      urlVideo: [null],
      imagens: [null],
    });

  }
  startup: any;
  
  tipoCliente: string | null = null;

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


  // excluirStartup() {
  //   const id = this.route.snapshot.paramMap.get("id");
  //   if (!id) {
  //     Swal.fire({
  //       title: "PontStart",
  //       html: "ID da startup não encontrado.",
  //       icon: "error",
  //       draggable: true,
  //     });
  //     return;
  //   }
  //   Swal.fire({
  //     title: "Tem certeza?",
  //     text: "Esta ação não poderá ser desfeita!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Sim, excluir!",
  //     cancelButtonText: "Cancelar",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.startupService.removerStartup(id).subscribe({
  //         next: () => {
  //           Swal.fire({
  //             title: "PontStart",
  //             html: "Startup excluída com sucesso!",
  //             icon: "success",
  //             draggable: true,
  //           });
  //         },
  //         error: (error) => {
  //           const erros: string = error.error?.join("<br/>") || "Erro ao excluir startup.";
  //           Swal.fire({
  //             title: "PontStart",
  //             html: erros,
  //             icon: "error",
  //             draggable: true,
  //           });
  //         },
  //       });
  //     }
  //   });
  // }

  atualizarStartup() {
    const startupData = this.perfilForm.value; // as Startup;
    console.log("Dados da startup a serem atualizados:", startupData);
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
        console.error("Erro ao atualizar startup:", error);
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
    this.startupService.obterStartups(id).subscribe((data) => {
      this.startup = data;
      console.log("Dados da startup obtidos:", this.startup);
      this.perfilForm.patchValue(data);
    });
  }
}
