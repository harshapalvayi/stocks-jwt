import {Component, OnInit} from '@angular/core';
import {UserService} from '@shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements  OnInit {
  title = 'stock-client';
  theme: string;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProperties().subscribe(response => {
       if (response != null) {
         this.theme = response;
       }
    });
  }
}
