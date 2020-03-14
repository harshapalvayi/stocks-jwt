import { Component, OnInit } from '@angular/core';
import {AdminTabs, MenuTabs as menus} from '@models/menus';
import {User} from '@models/User';
import {Stock} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  public tabs: AdminTabs;
  public selected = AdminTabs;
  public userInfo: User;
  public stocks: Stock[];
  public items: ({ label: string; value: AdminTabs, id: number })[];

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenStorageService.getUser();
      const { adminTabs } = menus;
      this.tabs = this.selected.STOCKS;
      this.items = adminTabs;
    }
  }

  public tabChange(id) {
    if (id) {
      if (id.index === 0) {
        this.tabs = this.selected.STOCKS;
      }
    }
  }
}
