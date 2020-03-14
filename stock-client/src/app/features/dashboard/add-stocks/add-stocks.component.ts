import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Stock} from '@models/stock';
import {User} from '@models/User';
import {StocksService} from '@shared/services/stocks/stocks.service';
import {UserService} from '@shared/services/user/user.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-add-stocks',
  templateUrl: './add-stocks.component.html',
  styleUrls: ['./add-stocks.component.sass']
})
export class AddStocksComponent implements OnInit {

  @Output() saved = new EventEmitter<Stock>();

  public userInfo: User;
  public addStock: FormGroup;
  public showFlag: boolean;

  constructor(private stockService: StocksService,
              private tokenService: TokenStorageService,
              private userService: UserService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUser();
      this.createForm();
    }
  }

  createForm() {
    this.addStock = this.stockService.create();
  }

  resetStock() {
    this.addStock.reset();
  }

  showDialog() {
    this.showFlag = true;
  }

  onCancel() {
    this.resetStock();
    this.showFlag = false;
  }

  onSubmitStock() {
    let stockData = this.addStock.getRawValue();
    if (this.userInfo && this.userInfo.id) {
      stockData = {user_id: this.userInfo.id, ...stockData};
      this.stockService.save(stockData).subscribe(() => {
        this.saved.emit(stockData);
        this.resetStock();
        this.showFlag = false;
      });
    }
  }
}
