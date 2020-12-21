import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserToken} from '@models/User';
import {FormGroup} from '@angular/forms';
import {SelectItem} from 'primeng';
import {OptionTypes as menus} from '@models/menus';
import {OptionFeed, OptionsData, OptionTimestamp, OptionType} from '@models/optionsChainData';
import {UserService} from '@shared/services/user/user.service';
import {DateService} from '@shared/services/date/date.service';
import {UtilService} from '@shared/services/util/util.service';
import {OptionsService} from '@shared/services/options/options.service';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.sass']
})
export class SearchOptionsComponent implements OnInit {

  @Output() action = new EventEmitter<OptionFeed>();
  cols: any[];
  public ticker: string;
  public stockName: string;
  public stockPrice: number;
  public showFlag: boolean;
  public spinner: boolean;
  public innerSpinner: boolean;
  public types: SelectItem[];
  public userInfo: UserToken;
  public puts: OptionType[];
  public calls: OptionType[];
  public searchOptions: FormGroup;
  public optionsData: OptionsData[];
  public expirationDates: SelectItem[] = [];

  constructor(private userService: UserService,
              private dateService: DateService,
              private utilService: UtilService,
              private optionService: OptionsService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.createForm();
    }
    this.cols = [
      {field: 'striker', header: 'Strike', width: '10%'},
      {field: 'lastPrice', header: 'Price', width: '10%'},
      {field: 'ask', header: 'Ask', width: '10%'},
      {field: 'bid', header: 'Bid', width: '10%'},
      {field: 'volume', header: 'Volume', width: '10%'},
      {field: 'openInterest', header: 'Interest', width: '10%'},
      {field: 'impliedVolatility', header: 'Volatility', width: '15%'},
    ];
  }

  showDialog(ticker: string) {
    if (ticker) {
      const { types } = menus;
      this.types = types;
      this.innerSpinner = false;
      this.spinner = true;
      this.ticker = ticker.toUpperCase();
      this.optionService.getOptionDetails(ticker).subscribe(data => {
        if (data != null && data.quote != null) {
            this.stockName = data.quote.displayName;
            this.stockPrice = data.quote.regularMarketPrice;
            this.optionsData = data.options;
            data.expirationDates.forEach(expiry => {
              const date = this.dateService.getFormattedDate(new Date(expiry));
              const value = (new Date(expiry)).getTime() / 1000;
              this.expirationDates.push({label: date, value});
            });
            this.showFlag = true;
            this.optionsData.forEach(option => {
              this.calls = option.calls;
              this.puts = option.puts;
            });
            this.resetOption();
            this.spinner = false;
        }
      });
    }
  }

  createForm() {
    this.searchOptions = this.optionService.createSearchOptions();
  }

  resetOption() {
    this.searchOptions.reset();
  }

  onCancel() {
    this.resetOption();
    this.showFlag = false;
  }

  onSelectExpiry() {
    this.innerSpinner = true;
    const expiry = this.searchOptions.get('expire').value;
    const optionType = this.searchOptions.get('optionType').value;
    const optionTimestamp: OptionTimestamp = {
      ticker: this.ticker,
      expiry
    };
    this.optionService.getOptionDetailsByTimestamp(optionTimestamp)
      .subscribe(data => {
      if (data && data.options) {
        data.options.forEach(option => {
          this.calls = option.calls;
          this.puts = option.puts;
        });
        this.searchOptions.get('expire').patchValue(expiry);
        this.searchOptions.get('optionType').patchValue(optionType);
        this.searchOptions.get('optionSymbol').patchValue(optionType);
      }
      this.resetStrikeSelection();
      this.innerSpinner = false;
    });
  }

  onSelectType() {
    this.resetStrikeSelection();
  }

  private resetStrikeSelection() {
    if (this.calls) {
      this.calls.forEach(call => call.selected = false);
    }
    if (this.puts) {
      this.puts.forEach(put => put.selected = false);
    }
    this.searchOptions.get('strike').patchValue(null);
  }

  onSelectOption(event) {
    const option = event.data;
    if (event && option) {
      this.calls.forEach(call => call.selected = false);
      this.puts.forEach(put => put.selected = false);
      option.selected = true;
      this.searchOptions.get('strike').patchValue(option.strike);
      this.searchOptions.get('optionPrice').patchValue(option.lastPrice);
      this.searchOptions.get('optionSymbol').patchValue(option.contractSymbol);
    }
  }

  onUnSelectOption(event) {
    const option = event.data;
    if (event && option) {
      option.selected = false;
      this.searchOptions.get('strike').patchValue(null);
      this.searchOptions.get('optionPrice').patchValue(null);
      this.searchOptions.get('optionSymbol').patchValue(null);
    }
  }

  onSubmit() {
    const optionData = this.searchOptions.getRawValue();
    if (optionData) {
      const optionFeed: OptionFeed = {
        expire: optionData.expire,
        strike: optionData.strike,
        optionPrice: optionData.optionPrice,
        optionType: optionData.optionType,
        optionSymbol: optionData.optionSymbol
      };
      this.action.emit(optionFeed);
      this.resetOption();
      this.showFlag = false;
    }
  }
}
