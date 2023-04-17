import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8000/login';
  private accessTokenSubject: BehaviorSubject<string>;

  constructor(private httpClient: HttpClient) {
    const accessToken = localStorage.getItem('access_token');
    this.accessTokenSubject = new BehaviorSubject<string>(accessToken || '');
  }

  public get accessToken(): string {
    return this.accessTokenSubject.value;
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = "username="+username+"&password="+password ;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    console.log("Sending to backend: ", body )
    return this.httpClient.post<LoginResponse>(this.apiUrl, body,{ headers }).pipe(
      map((response: LoginResponse) => {
        if (response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          this.accessTokenSubject.next(response.access_token);
        }

        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.accessTokenSubject.next("");
  }

  isAuthenticated(): boolean {
    return !!this.accessTokenSubject.value;
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
