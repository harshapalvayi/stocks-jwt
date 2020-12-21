import { Injectable } from '@angular/core';
import {Stock, StockList} from '@models/stock';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public static isXlsxFile(file: any) {
    return file.name.endsWith('.xlsx');
  }

  public static checkHeaders(headers) {
    const defaultHeaders = ['Buy', 'Sell', 'Shares', 'Ticker', 'Account', 'Trade'];
    const sortedHeaders = defaultHeaders.sort();
    return headers && JSON.stringify(defaultHeaders) === JSON.stringify(sortedHeaders);
  }

  public buildJsonObjectFromRecords(records): StockList[] {
    console.log('records', records);
    const excelRecords: StockList[] = [];
    if (records && records.length > 0) {
      records.forEach(record => {
        const column: Stock = new Stock();
        column.ticker = record.Ticker;
        column.shares = record.Shares;
        column.buyPrice = record.Buy;
        column.sellPrice = record.Sell;
        column.account = record.Account;
        column.tradeDate = new Date(record.Trade);
        excelRecords.push(column);
      });
    }
    return excelRecords;
  }

}
