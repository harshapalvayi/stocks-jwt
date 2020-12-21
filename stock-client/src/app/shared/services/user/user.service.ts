import { Injectable } from '@angular/core';
import {
  TokenStorageService
} from '@shared/services/token-storage/token-storage.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private editUserDetails: FormGroup;
  private userRegistrationDetails: FormGroup;
  public properties: Subject<string> =  new Subject<string>();

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private tokenService: TokenStorageService) { }

  getProperties(): Subject<string> {
    return this.properties;
  }

  setProperties(value) {
    this.properties.next(value);
  }

  authenticate(username, password) {
    if (username && password) {
      window.sessionStorage.setItem('name', username);
      return true;
    }
    return false;
  }

  createRegistrationForm() {
    this.userRegistrationDetails = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, this.validatePasscode]],
      email: [null, [Validators.required, Validators.email]]
    });
    return this.userRegistrationDetails;
  }

  createEditUserDetails(editType, content): FormGroup {
    if (editType === 'email') {
      this.editUserDetails  = this.fb.group({
        email: [content, [Validators.required, Validators.pattern(this.emailPattern)]]
      });
    } else {
      this.editUserDetails  = this.fb.group({
        passcode: [null, [Validators.required, this.validatePasscode]]
      });
    }
    return this.editUserDetails;
  }

  isUserLoggedIn() {
    const user = window.sessionStorage.getItem('name');
    return !(user === null) && !this.tokenService.isTokenExpired();
  }

  saveContent(userId: number, content: string, editType: string): Observable<any> {
    return this.http.put<any>(`api/user/${userId}/${editType}`, content).pipe(
      map(data => data));
  }

  saveTheme(userId: number, type: string): Observable<any> {
    return this.http.put<any>(`api/user/${userId}`, type).pipe(
      map(data => data));
  }

  logout() {
    this.tokenService.setSharedUserProfile(null);
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  validatePasscode(control: FormControl): {[errorType: string]: boolean} {
    if (control.value) {
      if (control.value.toString().length < 8) {
        return {limit: true};
      }
      if (!control.value.toString().match(/.*[0-9]+.*/)) {
        return {number: true};
      }
      if (!control.value.toString().match(/.*[@#$%^&+=].*/)) {
        return {special: true};
      }
      if (!control.value.toString().match(/.*[A-Z].*/)) {
        return {capital: true};
      }
    }
    return null;
  }
}
