import { Component, OnInit } from '@angular/core';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {Observable} from 'rxjs';
import { UserToken} from '@models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public userInfo$: Observable<UserToken> = this.tokenStorage.getSharedUserProfile();
  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
  }

}
