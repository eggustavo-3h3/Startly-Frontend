import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../resources/util";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private authUrl = `${API_BASE_URL}/autenticar`;

    private tokenSubject = new BehaviorSubject<string | null>(
       localStorage.getItem('token')
    );
    token: any;

    constructor(private http: HttpClient, private router: Router){}

    login(username: string, password: string): Observable<string>{
        return new Observable(observable =>{
            this.http.post<string>(this.authUrl,{
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
