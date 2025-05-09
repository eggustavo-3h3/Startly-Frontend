import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../resources/util";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Atuacao } from "../models/atuacoes.model";

@Injectable({
    providedIn: 'root'
})

export class atuacaoService {
    private url = API_BASE_URL;

    constructor (private http : HttpClient) {}

    listarAtuacoes () :  Observable<Atuacao[]>{
        //funcao para listar as atuacoes
        return this.http.get<Atuacao[]>(`${this.url}/atuacao/listar`)
    }

    excluirAtuacao (id:number) : Observable<Atuacao[]> {
        //funcao para excluir atuacao
        return this.http.delete<Atuacao[]>(`${this.url}/atuacao/remover${id}`)
    }
}

