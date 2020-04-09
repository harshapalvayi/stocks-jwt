import {Component, Input, OnInit} from '@angular/core';
import {CustomStockInfo, StockInfo} from '@models/stock';

@Component({
  selector: 'app-top-movers',
  templateUrl: './top-movers.component.html',
  styleUrls: ['./top-movers.component.sass']
})
export class TopMoversComponent implements OnInit {

  @Input() public  stocks: StockInfo[];

  constructor() { }

  ngOnInit() {
  }

}
