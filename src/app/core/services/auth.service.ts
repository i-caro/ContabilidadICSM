import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hashedPassword: string = '6970e333c7949f59cafc908fcbac1f8c4109aa358d63ce8d7fddf8d1aa9ab491';
  private username: string = 'ivan';
  private isAuthenticated = false;

  constructor() {}

  login(username: string, password: string): boolean {
    const hashedInputPassword = CryptoJS.SHA256(password).toString();

    if (username === this.username && hashedInputPassword === this.hashedPassword) {
      localStorage.setItem('loggedIn', 'true');
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}
