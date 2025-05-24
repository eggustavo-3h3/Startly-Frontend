import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private baseUrl = environment.apiUrl;

    private tokenSubject = new BehaviorSubject<string | null>(
       localStorage.getItem('token')
    );
    token: any;

    constructor(private http: HttpClient, private router: Router){}

    login(username: string, password: string): Observable<string>{
        return new Observable(observable =>{
            this.http.post<string>(`${this.baseUrl}/authUrl`,{
                login: username,
                senha: password
            }).subscribe({
                next: (response) => {
                    localStorage.setItem('token', response);
                    this.tokenSubject.next(response);

                    observable.next(response);
                    observable.complete();
                },
                error: (error) => {
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
}
