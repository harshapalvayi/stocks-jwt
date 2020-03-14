import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserToken} from '@models/User';

const TOKEN_KEY = 'jwtToken';
const USER_KEY = 'name';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private sharedUserProfile = new BehaviorSubject<UserToken>(null);

  constructor() { }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    console.log('save user', user);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.sharedUserProfile.next(user);
  }

  getSharedUserProfile() {
    return this.sharedUserProfile;
  }

  setSharedUserProfile(user) {
  this.sharedUserProfile.next(user);
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
