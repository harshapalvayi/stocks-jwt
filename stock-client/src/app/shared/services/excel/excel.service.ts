import { Injectable } from '@angular/core';
import {Share, ShareList} from '@models/stock';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public static isXlsxFile(file: any) {
    return file.name.endsWith('.xlsx');
  }

  public static checkHeaders(headers) {
    const defaultHeaders = ['Buy', 'Shares', 'Ticker'];
    const sortedHeaders = defaultHeaders.sort();
    return headers && JSON.stringify(defaultHeaders) === JSON.stringify(sortedHeaders);
  }

  public buildJsonObjectFromRecords(records): ShareList[] {
    const excelRecords: ShareList[] = [];
    if (records && records.length > 0) {
      records.forEach(record => {
        const column: Share = new Share();
        column.ticker = record.Ticker;
        column.shares = record.Shares;
        column.buy =    record.Buy;
        excelRecords.push(column);
      });
    }
    return excelRecords;
  }

}
