import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDto } from '../models/registerdto.model';
import { AuthResponse } from '../models/authresponsedto.model';

import { environment } from '../../environment/environment';

import { LoginDto } from '../models/logindto.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // inject() replaces constructor — cleaner way to get dependencies
  private http   = inject(HttpClient);
  private router = inject(Router);

  // signal = reactive variable — when it changes, UI updates automatically
  isLoggedIn = signal<boolean>(false);

  // called once on app start to restore session from localStorage
  checkSession(): void {
    if (localStorage.getItem('mb_token')) {
      this.isLoggedIn.set(true);
    }
  }

  // register — just makes the HTTP call, component handles the response
  register(dto: RegisterDto) {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/register`, dto);
  }

  // login — just makes the HTTP call, component handles the response
  login(dto: LoginDto) {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`, dto);
  }

  // called by component after successful login or register
  saveSession(res: AuthResponse): void {
    localStorage.setItem('mb_token', res.token);
    localStorage.setItem('mb_user', JSON.stringify(res));
    this.isLoggedIn.set(true);
  }

  // clears everything and goes to login page
  logout(): void {
    localStorage.removeItem('mb_token');
    localStorage.removeItem('mb_user');
    this.isLoggedIn.set(false);
    this.router.navigate(['/auth/login']);
  }

  // used by interceptor to attach token to every request
  getToken(): string | null {
    return localStorage.getItem('mb_token');
  }

  // used by navbar and dashboard to show email / role
  getUser(): AuthResponse | null {
    const data = localStorage.getItem('mb_user');
    return data ? JSON.parse(data) : null;
  }

  // used by adminGuard and navbar to show/hide admin links
  isAdmin(): boolean {
    return this.getUser()?.role === 'Admin';
  }

}
