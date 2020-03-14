import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {UserService} from '@shared/services/user/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

  public user: string;
  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.user = this.tokenStorage.getUser().name;
    }
  }
}
