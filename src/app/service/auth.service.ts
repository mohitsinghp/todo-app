import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverURL = 'http://localhost:3001';
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const body = {
      "username": username,
      "password": password
    }
    return this.http.post(`${this.serverURL}/login`, body).toPromise();
  }

  isValidToken() {
    return this.http.post(`${this.serverURL}/valid`,{}).toPromise();
  }

}
