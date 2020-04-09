import {Component, Input, OnInit} from '@angular/core';
import {Portfolio} from '@models/stock';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass']
})
export class PortfolioComponent implements OnInit {

  @Input() public portfolio: Portfolio;
  @Input() public stocks: number;
  constructor() { }

  ngOnInit() {
  }

}
