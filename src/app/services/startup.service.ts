import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Startup } from "../models/startup.model";
import { Observable } from "rxjs";
import { NovaStartup } from "../models/nova-startup.model";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class startupService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  listarStartups(): Observable<Startup[]> {
    // Método para listar as startups
    return this.http.get<Startup[]>(`${this.baseUrl}/startup/listar`, {
      headers: this.authService.getAutheHeaders(),
    });
  }

  obterStartups(id: any): Observable<Startup[]> {
    // Método para obter a lista de startups
    return this.http.get<Startup[]>(`${this.baseUrl}/startup/obter/${id}`, {
      headers: this.authService.getAutheHeaders(),
    });
  }

  pesquisarStartups(nome: string): Observable<Startup[]> {
    // Método para pesquisar startups por nome
    return this.http.get<Startup[]>(
      `${this.baseUrl}/startup/buscar/?nome=${nome}`,
      { headers: this.authService.getAutheHeaders() },
    );
  }

  adicionarStartup(startup: Startup): Observable<string> {
    // Método para adicionar uma nova startup
    return this.http.post<string>(
      `${this.baseUrl}/startup/adicionar`,
      startup,
      { headers: this.authService.getAutheHeaders() },
    );
  }

  atualizarStartup(startup: Startup): Observable<Startup[]> {
    // Método para atualizar uma startup existente
    return this.http.put<Startup[]>(
      `${this.baseUrl}/startup/atualizar`,
      startup,
      { headers: this.authService.getAutheHeaders() },
    );
  }

  removerStartup(id: string): Observable<Startup[]> {
    // Método para remover uma startup
    return this.http.delete<Startup[]>(
      `${this.baseUrl}/startup/remover/${id}`,
      { headers: this.authService.getAutheHeaders() },
    );
  }
}
