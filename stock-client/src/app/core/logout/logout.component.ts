import { Component, OnInit } from '@angular/core';
import {UserService} from '@shared/services/user/user.service';
import {Router} from '@angular/router';

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
    this.router.navigate(['/app-landing-page']);
  }

}
