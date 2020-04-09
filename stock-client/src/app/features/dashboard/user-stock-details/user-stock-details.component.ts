import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Share, StockInfo} from '@models/stock';
import {SharesService} from '@shared/services/shares/shares.service';
import {UserService} from '@shared/services/user/user.service';
import {User, UserToken} from '@models/User';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-user-stock-details',
  templateUrl: './user-stock-details.component.html',
  styleUrls: ['./user-stock-details.component.less']
})
export class UserStockDetailsComponent implements OnInit {

  @Output() action = new EventEmitter<string>();
  @Input() shares: StockInfo[];
  public userInfo: UserToken;
  public cols: any[];
  public editStock: { [s: number]: StockInfo; } = {};

  constructor(private userService: UserService,
              private tokenService: TokenStorageService,
              private shareService: SharesService) { }

  ngOnInit() {

    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
    this.cols = [
      { field: 'ticker', header: 'Ticker', width: '10%'},
      { field: 'stockName', header: 'Stock', width: '30%'},
      { field: 'price', header: 'Price', width: '10%'},
      { field: 'percentChange', header: 'Change', width: '10%', icon: true},
      { field: 'buy', header: 'Buy', width: '10%' },
      { field: 'shares', header: 'Shares', width: '10%' },
      { field: '', header: 'Actions',  width: '15%' }
    ];
  }

  onRowEditInit(share: StockInfo) {
    this.editStock[share.shareid] = {...share};
  }

  onRowEditSave(share: StockInfo) {
    if (share) {
      if (this.userInfo && this.userInfo.id) {
        const currentUser = new User();
        currentUser.userid = this.userInfo.id;
        const shareData: Share = {
          shareid: share.shareid,
          shares: share.shares,
          ticker: share.ticker,
          buy: share.buy,
          getUserInfo(): User { return currentUser; }
        };
        this.shareService.edit(shareData).subscribe(() => {
          this.action.emit('updated');
          delete this.editStock[share.shareid];
        });
      }
    }
  }

  onRowEditCancel(share: StockInfo, index: number) {
    this.shares[index] = this.editStock[share.shareid];
    delete this.editStock[share.shareid];
  }

  deleteStock(share: StockInfo) {
     this.shareService.deleteStock(share.shareid).subscribe(() => {
         this.action.emit('deleted');
     });
  }

  getChange(data) {
    const change = data.substr(0, data.length - 1);
    return Number(change);
  }
}
