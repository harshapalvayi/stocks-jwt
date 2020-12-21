import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserToken} from '@models/User';
import {StockInfo} from '@models/stock';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {StockService} from '@shared/services/stock/stock.service';

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
              private stockService: StockService,
              private accountService: AccountService,
              private notification: NotificationService,
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
      const shareId = this.stock.stockId;
      const userId = this.userInfo.id;
      const stock = this.stock.name;
      this.stockService.delete(shareId, userId).subscribe(() => {
        this.deleted.emit('deleted');
        const toastDetails = {
          message: 'Success',
          details: `Your order to remove ${stock} has been successfully deleted.`
        };
        this.notification.showSuccess(toastDetails);
        this.showFlag = false;
      }, error => {
        console.log('error', error);
      });
    }
  }
}
