import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated())
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string | null) {
    if (token !== null){
      window.localStorage.setItem("auth_token", token)
    } else {
      this.clearToken()
    }
    this.isAuthenticatedSubject.next(this.isAuthenticated())
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false)
  }
}
