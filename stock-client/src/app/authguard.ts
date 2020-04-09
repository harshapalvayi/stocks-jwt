import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate {

  constructor(private router: Router,
              private tokenService: TokenStorageService) { }

  canActivate() {
    if (!this.tokenService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/app-login-page']);
    return false;
  }
}
