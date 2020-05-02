import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '@shared/services/jwt/authentication.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {

  private isLoggedIn = false;
  private isValid = true;
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private jwtService: AuthenticationService) {
  }

  ngOnInit() {
      this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submit() {
    this.jwtService.login(this.loginForm.value)
      .subscribe(data => {
          this.tokenStorage.setSharedUserProfile(data);
          this.tokenStorage.saveUser(data);
          this.router.navigate(['/app-landing-page']);
          this.isLoggedIn = true;
        },
        error => {
          console.log(error);
          this.isValid = false;
          this.isLoggedIn = false;
        }
      );
  }

}
