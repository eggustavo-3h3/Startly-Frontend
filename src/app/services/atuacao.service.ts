import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../resources/util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Atuacao } from "../models/atuacoes.model";

@Injectable({
    providedIn: 'root'
})

export class AtuacaoService {
    private url = API_BASE_URL;

    constructor (private http : HttpClient) {}

    //funcao para listar as atuacoes
    listarAtuacoes () :  Observable<Atuacao[]>{        
        return this.http.get<Atuacao[]>(`${this.url}/atuacao/listar`)
    }

    //funcao para excluir atuacao
    excluirAtuacao (id:number) : Observable<Atuacao[]> {        
        return this.http.delete<Atuacao[]>(`${this.url}/atuacao/remover${id}`)
    }
}

