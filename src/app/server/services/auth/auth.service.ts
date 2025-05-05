import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequestDto } from './models/login-request.dto';
import { User } from './models/user.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  #http = inject(HttpClient);

  #url = `${environment.url}/auth`;

  user: User | null = null;

  login(loginRequestDto: LoginRequestDto) {
    return this.#http.post(`${this.#url}/login`, loginRequestDto).pipe(
      tap((response: any) => {
        this.user = {
          id: response.id,
          email: response.email,
        }
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    ))
  }

  logout() {
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
