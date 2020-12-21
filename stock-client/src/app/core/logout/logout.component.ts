import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '@shared/services/user/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(public router: Router,
              public userService: UserService) { }

  ngOnInit() {
      this.userService.logout();
      this.router.navigate(['/app-login-page']);
  }

}
