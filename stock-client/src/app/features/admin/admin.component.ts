import { Component, OnInit } from '@angular/core';
import {UserService} from '@shared/services/user/user.service';
import {UtilService} from '@shared/services/util/util.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService,
              private utilService: UtilService) { }

  ngOnInit() {
  }

}
