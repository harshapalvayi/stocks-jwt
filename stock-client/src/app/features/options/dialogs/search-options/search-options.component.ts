import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserToken} from '@models/User';
import {FormGroup} from '@angular/forms';
import {UserService} from '@shared/services/user/user.service';
import {OptionsService} from '@shared/services/options/options.service';
import {UtilService} from '@shared/services/util/util.service';
import {OptionFeed, OptionsData, OptionTimestamp, OptionType} from '@models/options';
import {SelectItem} from 'primeng';
import {OptionTypes as menus} from '@models/menus';
import {DateService} from '@shared/services/date/date.service';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.sass']
})
export class SearchOptionsComponent implements OnInit {

  @Output() action = new EventEmitter<OptionFeed>();

  public ticker: string;
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
  }

  showDialog(ticker) {
    if (ticker) {
      const { types } = menus;
      this.types = types;
      this.innerSpinner = false;
      this.showFlag = true;
      this.spinner = true;
      this.optionService.getOptionDetails(ticker).subscribe(data => {
        if (data) {
            this.ticker = data.underlyingSymbol;
            this.optionsData = data.options;
        }
        this.optionsData.forEach(option => {
          this.calls = option.calls;
          this.puts = option.puts;
        });
        data.expirationDates.forEach(expiry => {
          const date = this.dateService.getFormattedDate(new Date(expiry));
          const value = (new Date(expiry)).getTime() / 1000;
          this.expirationDates.push({label: date, value});
        });
        this.resetOption();
        this.spinner = false;
      });
    }
  }

  createForm() {
    this.searchOptions = this.optionService.createSearchOptions();
  }

  resetOption() {
    this.searchOptions.reset();
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
      if (data) {
        data.options.forEach(option => {
          this.calls = option.calls;
          this.puts = option.puts;
        });
        this.resetStrikeSelection();
        this.searchOptions.get('expire').patchValue(expiry);
        this.searchOptions.get('optionType').patchValue(optionType);
      }
      this.innerSpinner = false;
    });
  }

  onSelectType() {
    this.resetStrikeSelection();
  }

  private resetStrikeSelection() {
    this.calls.forEach(call => call.selected = false);
    this.puts.forEach(put => put.selected = false);
    this.searchOptions.get('strike').patchValue(null);
  }

  onSelectOption(option) {
    this.calls.forEach(call => call.selected = false);
    this.puts.forEach(put => put.selected = false);
    option.selected = true;
    this.searchOptions.get('strike').patchValue(option.strike);
    this.searchOptions.get('optionPrice').patchValue(option.lastPrice);
  }

  onSubmit() {
    const optionData = this.searchOptions.getRawValue();
    if (optionData) {
      const optionFeed: OptionFeed = {
        expire: optionData.expire,
        strike: optionData.strike,
        optionPrice: optionData.optionPrice,
        optionType: optionData.optionType,
      };
      this.action.emit(optionFeed);
      this.resetOption();
      this.showFlag = false;
    }
  }
}
