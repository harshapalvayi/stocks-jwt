import { Component, OnInit } from '@angular/core';
import {UserToken} from '@models/User';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

  public user: UserToken;
  constructor(public userService: UserService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.user = this.tokenStorage.getUserDetails();
    }
  }
}
