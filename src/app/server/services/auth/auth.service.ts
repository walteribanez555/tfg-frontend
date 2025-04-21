import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequestDto } from './models/login-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  #http = inject(HttpClient);

  #url = `${environment.url}/auth`;

  login(loginRequestDto: LoginRequestDto) {
    return this.#http.post(`${this.#url}/login`, loginRequestDto);
  }
}
