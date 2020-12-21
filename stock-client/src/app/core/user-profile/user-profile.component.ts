import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {FormGroup} from '@angular/forms';
import {UserService} from '@shared/services/user/user.service';
import {UserToken} from '@models/User';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '@shared/services/notification/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  public editType: string;
  public content: string;
  public showFlag: boolean;
  public user: UserToken;
  public editUserDetails: FormGroup;
  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.getProfile();
    this.createUserDetails();
  }

  getProfile() {
    if (this.userService.isUserLoggedIn()) {
      this.user = this.tokenStorage.getUserDetails();
    }
  }

  onEdit(editType: string) {
    this.editType = editType;
    this.createUserDetails();
    this.showFlag = true;
  }

  createUserDetails() {
    if (this.editType === 'email') {
      this.content = this.user.email;
    } else {
      this.content = null;
    }
    this.editUserDetails = this.userService.createEditUserDetails(this.editType, this.content);
  }

  onEditUserDetails() {
    let content: string;
    if (this.editType === 'email') {
      content = this.editUserDetails.get('email').value;
    } else {
      content = this.editUserDetails.get('passcode').value;
    }
    this.userService.saveContent(this.user.id, content, this.editType)
      .subscribe(() => {
        const toastDetails = {
          message: 'Success',
          details: `Successfully updated ${this.editType}`
        };
        this.notificationService.showSuccess(toastDetails);
        this.showFlag = false;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  resetStock() {
    this.editUserDetails.reset();
  }

  onCancel() {
    this.showFlag = false;
  }

  onTheme(type: string) {
    this.userService.setProperties(type);
    this.userService.saveTheme(this.user.id, type)
      .subscribe(() => {
        const toastDetails = {
          message: 'Success',
          details: `Successfully updated to ${type} Theme`
        };
        this.notificationService.showSuccess(toastDetails);
        this.showFlag = false;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

}
