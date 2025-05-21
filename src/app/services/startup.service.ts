import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../resources/util';
import { Startup } from '../models/startup.model';
import { Observable } from 'rxjs';
import { NovaStartup } from '../models/nova-startup.model';

@Injectable({
    providedIn: 'root'
})

export class startupService{
    
    private url = API_BASE_URL; // URL da API

    constructor(private http: HttpClient) {}

    listarStartups() : Observable<Startup[]> {
        // Método para listar as startups
        return this.http.get<Startup[]>(`${this.url}/startup/listar`)
        }

    obterStartups(id : any) : Observable<Startup[]> {
        // Método para obter a lista de startups
        return this.http.get<Startup[]>(`${this.url}/startup/obter/${id}`)
    }
    
    adicionarStartup(startup: NovaStartup) : Observable<string> {
        // Método para adicionar uma nova startup
        return this.http.post<string>(`${this.url}/startup/adicionar`, startup)
    }
    atualizarStartup(startup: Startup) : Observable<Startup[]> 
    {
        // Método para atualizar uma startup existente
        return this.http.put<Startup[]>(`${this.url}/startup/atualizar`, startup)
    }
    removerStartup(id: string) : Observable<Startup[]> {
        // Método para remover uma startup
        return this.http.delete<Startup[]>(`${this.url}/startup/remover/${id}`)
    }
    
}