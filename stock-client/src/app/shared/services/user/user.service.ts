import { Injectable } from '@angular/core';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private tokenService: TokenStorageService) { }

  authenticate(username, password) {
    if (username && password) {
      window.sessionStorage.setItem('name', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    const user = window.sessionStorage.getItem('name');
    return !(user === null);
  }

  logout() {
    this.tokenService.setSharedUserProfile(null);
    window.sessionStorage.clear();
  }
}
