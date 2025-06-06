import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private baseUrl = environment.apiUrl;

    private tokenSubject = new BehaviorSubject<string | null>(
       localStorage.getItem('token')
    );
    token: any;
    startupId: string | null = null;

    constructor(private http: HttpClient, private router: Router){}

    login(username: string, password: string): Observable<string>{
        return new Observable(observable =>{
            this.http.post<string>(`${this.baseUrl}/autenticar`,{
                login: username,
                senha: password
            }).subscribe({
                next: (response) => {
                    localStorage.setItem('token', response);
                    this.tokenSubject.next(response);

                    this.startupId = this.getClaim("Id");

                    observable.next(response);
                    observable.complete();
            
                },
                error: (error) => {
                    console.log(error)
                    observable.error(error);
                    observable.complete();
                }
            });
        });
    }

    logout(){
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean{
        return !!this.tokenSubject.value;
    }

    getAutheHeaders(){
        return new HttpHeaders({
            'Authorization':`Bearer ${this.token}`
        });
    }

    getClaim<T = any>(claimName: string): T | null {
        const token = this.tokenSubject.value;
        if (!token) return null;
    
        try {
          const decoded: any = jwtDecode(token);
          console.log("decoded: ", decoded);
          return decoded[claimName] ?? null;
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
          return null;
        }
      }
}


