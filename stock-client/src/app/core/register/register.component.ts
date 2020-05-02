import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {AuthenticationService} from '@shared/services/jwt/authentication.service';
import {NotificationService} from '@shared/services/notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  private isRegistered = false;
  public signUpForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private tokenStorage: TokenStorageService,
              private jwtService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.signUpForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required]
    });
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
          this.isRegistered = true;
        },
        error => {
          console.log(error);
          this.isRegistered = false;
        }
      );
  }
}
