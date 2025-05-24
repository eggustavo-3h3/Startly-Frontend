import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Atuacao } from "../models/atuacoes.model";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class AtuacaoService {
    private baseUrl = environment.apiUrl;

    constructor (private http : HttpClient, private authService: AuthService) {}

    //funcao para listar as atuacoes
    listarAtuacoes () :  Observable<Atuacao[]>{        
        return this.http.get<Atuacao[]>(`${this.baseUrl}/atuacao/listar`, { headers: this.authService.getAutheHeaders() })
    }

    //funcao para excluir atuacao
    excluirAtuacao (id:number) : Observable<Atuacao[]> {        
        return this.http.delete<Atuacao[]>(`${this.baseUrl}/atuacao/remover/${id}`, { headers: this.authService.getAutheHeaders() })
    }
}

