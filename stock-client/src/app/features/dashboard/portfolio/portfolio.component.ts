import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Portfolio} from '@models/stock';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass']
})
export class PortfolioComponent implements OnInit, OnChanges {

  @Input() public portfolio: Portfolio;
  @Input() public stocks: number;
  public status: string;
  constructor(private currencyPipe: CurrencyPipe){ }

  ngOnInit() {
    this.buildData();
  }

  ngOnChanges(): void {
    this.buildData();
  }

  buildData() {
    if (this.portfolio && this.portfolio.investment &&
      this.portfolio.equity && this.portfolio.percentChange) {
      const change = Math.abs(this.portfolio.equity - this.portfolio.investment);
      const percentChange = this.portfolio.percentChange;
      const changeInCurrency = this.currencyPipe.transform(change);
      this.status = `${changeInCurrency} (${percentChange})`;
    }
  }
}
