import {Component, Input, OnInit} from '@angular/core';
import {CustomStockInfo} from '@models/stock';
import {Chart} from '@models/chart';

@Component({
  selector: 'app-auto-play-cards',
  templateUrl: './auto-play-cards.component.html',
  styleUrls: ['./auto-play-cards.component.sass']
})
export class AutoPlayCardsComponent implements OnInit {

  @Input() public  stocks: CustomStockInfo[];
  responsiveOptions;
  loader: boolean;

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.loader = true;
  }

  getHistory(share): Chart {
    this.loader = false;
    return share.history;
  }
}


