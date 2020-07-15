import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserToken} from '@models/User';
import {UserService} from '@shared/services/user/user.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {StockInfo} from '@models/stock';

@Component({
  selector: 'app-delete-stocks',
  templateUrl: './delete-stocks.component.html',
  styleUrls: ['./delete-stocks.component.sass']
})
export class DeleteStocksComponent implements OnInit {

  @Output() deleted = new EventEmitter<string>();

  public showFlag: boolean;
  public stock: StockInfo;
  public userInfo: UserToken;

  constructor(private userService: UserService,
              private shareService: SharesService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  showDialog(stock: StockInfo) {
    this.stock = stock;
    this.showFlag = true;
  }

  onCancel() {
    this.showFlag = false;
  }

  onSubmitStock() {
    if (this.stock && this.userInfo && this.userInfo.id) {
      const shareId = this.stock.shareId;
      const userId = this.userInfo.id;
      this.shareService.delete(shareId, userId).subscribe(() => {
        this.deleted.emit('deleted');
        this.showFlag = false;
      }, error => {
        console.log('error', error);
      });
    }
  }
}
