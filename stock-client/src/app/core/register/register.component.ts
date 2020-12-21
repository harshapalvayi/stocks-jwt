import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {AuthenticationService} from '@shared/services/jwt/authentication.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '@shared/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  public errorMessage: string;
  public signUpForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private tokenStorage: TokenStorageService,
              private jwtService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.signUpForm = this.userService.createRegistrationForm();
  }

  submit() {
    this.jwtService.register(this.signUpForm.value)
      .subscribe(data => {
          this.tokenStorage.saveUser(data);
          const toastDetails = {
            message: 'Success',
            details: 'User Registered Successfully'
          };
          this.notificationService.showSuccess(toastDetails);
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
