import {Component, OnInit, ViewChild} from '@angular/core';
import {StockDetails} from '@models/stock';
import {ExcelService} from '@shared/services/excel/excel.service';
import {StocksService} from '@shared/services/stocks/stocks.service';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.sass']
})
export class StockViewComponent implements OnInit {

  @ViewChild('uploadFile', { static: false }) file;

  public cols: any[];
  public stocks: StockDetails[];

  constructor(private excelService: ExcelService,
              private stocksService: StocksService) { }

  ngOnInit() {

    this.cols = [
      {field: 'ticker', header: 'Ticker', width: '10%'},
      {field: 'stock', header: 'Stock', width: '40%'},
      {field: 'price', header: 'Price', width: '10%'},
      {field: 'low', header: 'Low', width: '10%'},
      {field: 'high', header: 'High', width: '10%'},
      {field: 'dividend', header: 'Dividend', width: '15%'},
    ];

    this.stocksService.getAllStockDetails().subscribe(stock => this.stocks = stock);
  }

  uploadStocks(event) {
    this.excelService.processExcelFile(event, this.file);
  }

}
