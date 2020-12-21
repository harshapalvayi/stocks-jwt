import { Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {AuthenticationService} from '@shared/services/jwt/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LocationService} from '@shared/services/location/location.service';
import {UserService} from '@shared/services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {

  public errorMessage: string;
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private location: LocationService,
              private elementRef: ElementRef,
              private tokenStorage: TokenStorageService,
              private jwtService: AuthenticationService) {
  }

  ngOnInit() {
      this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    this.jwtService.login(this.loginForm.value)
      .subscribe(data => {
          this.tokenStorage.saveUser(data);
          if (data.theme != null) {
            this.userService.setProperties(data.theme);
          } else {
            this.userService.setProperties('light');
          }
          this.router.navigate(['/app-landing-page']);
          this.errorMessage = null;
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = error.error.message;
          }
        }
      );
  }
}
