import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserToken} from '@models/User';

const USER_ID = 'id';
const USER_KEY = 'name';
const USER_EMAIL = 'email';
const TOKEN_KEY = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private sharedUserProfile = new BehaviorSubject<UserToken>(null);

  constructor() { }

  private removeUserFromSessionAndLocalStorage(user) {
    window.sessionStorage.removeItem(user);
    window.localStorage.removeItem(user);
  }

  private saveUserFromSessionAndLocalStorage(user) {
    window.sessionStorage.setItem(USER_ID, user.id);
    window.sessionStorage.setItem(TOKEN_KEY, user.jwtToken);
    window.sessionStorage.setItem(USER_KEY, user.name);
    window.sessionStorage.setItem(USER_EMAIL, user.email);

    window.localStorage.setItem(USER_ID, user.id);
    window.localStorage.setItem(TOKEN_KEY, user.jwtToken);
    window.localStorage.setItem(USER_KEY, user.name);
    window.localStorage.setItem(USER_EMAIL, user.email);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    this.removeUserFromSessionAndLocalStorage(user);
    this.saveUserFromSessionAndLocalStorage(user);
    this.sharedUserProfile.next(user);
  }

  getSharedUserProfile() {
      return this.sharedUserProfile;
  }

  setSharedUserProfile(user) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.sharedUserProfile.next(user);
  }

  public getUser() {
    return sessionStorage.getItem(USER_KEY);
  }

  public getUserDetails(): UserToken {
    const userDetails: UserToken = {
      id: Number(sessionStorage.getItem(USER_ID)),
      name: sessionStorage.getItem(USER_KEY),
      jwtToken: sessionStorage.getItem(TOKEN_KEY),
      email: sessionStorage.getItem(USER_EMAIL)
    };
    return userDetails;
  }

  isTokenExpired(): boolean {
    const token  = this.getToken();
    if (!token) {
      return true;
    }
  }
}
