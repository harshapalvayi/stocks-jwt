import { Injectable } from '@angular/core';
import {NotificationService} from '@shared/services/notification/notification.service';
import {StocksService} from '@shared/services/stocks/stocks.service';
import {ToastDetails} from '@models/Notification';
import {StockDetails} from '@models/stock';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  public xslxRecords: any[] = [];

  constructor(private notification: NotificationService,
              private stocksService: StocksService) { }


  public isXlsxFile(file: any) {
     return file.name.endsWith('.xlsx');
  }

  public checkHeaders(headers) {
      const defaultHeaders = ['Ticker', 'Stock', 'Price', 'Dividend', 'High', 'Low', 'Ex-Date', 'Pay-Date'];
      console.log(JSON.stringify(defaultHeaders));
      console.log(JSON.stringify(headers));
      return headers && JSON.stringify(defaultHeaders) === JSON.stringify(headers);
  }

  public buildJsonObjectFromRecords(records) {
     if (records && records.length > 0) {
       records.forEach(record => {
         const column: StockDetails = new StockDetails();
         column.ticker = record.Ticker;
         column.stock = record.Stock;
         column.price = record.Price;
         column.dividend = record.Dividend;
         column.high = record.High;
         column.low = record.Low;
         column.exDate = record.Ex_Date;
         column.payDate = record.Pay_Date;
         this.xslxRecords.push(column);
       });
     }
     console.log('xlsxRecords', this.xslxRecords);
  }

  public processExcelFile(event, file) {
    let toastDetails: ToastDetails = {};

    const target: DataTransfer = (event.target) as DataTransfer;

    if (event && this.isXlsxFile(target.files[0])) {
       if (target.files.length !== 1) {
          toastDetails = {
            message: 'Error',
            details: 'Cannot use multiple Files'
          };
          this.notification.showError(toastDetails);
       }
       const reader: FileReader = new FileReader();

       reader.onload = (e: any) => {
         /* Read Workbook */
         const book: string = e.target.result;
         const workBook: XLSX.WorkBook = XLSX.read(book, {type: 'binary'});

         /* Grab First Sheet */
         const sheet: string = workBook.SheetNames[0];
         const workSheet: XLSX.WorkSheet = workBook.Sheets[sheet];

         /* Save Data */
         const headers = XLSX.utils.sheet_to_json(workSheet, {header: 1})[0];

         if (this.checkHeaders(headers)) {
           const xlsxRecords = XLSX.utils.sheet_to_json(workSheet, {raw: true});
           this.buildJsonObjectFromRecords(xlsxRecords);
           this.stocksService.uploadStockFile(this.xslxRecords).subscribe(res => {
              if (res.status === 'SUCCESS') {
                toastDetails = {
                  message: 'Success',
                  details: 'File Uploaded Successfully'
                };
                this.notification.showSuccess(toastDetails);
              } else {
                toastDetails = {
                  message: 'Error',
                  details: 'Failed to Upload File'
                };
                this.notification.showError(toastDetails);
              }
           });
         } else {
           toastDetails = {
             message: 'Error',
             details: 'Invalid Headers'
           };
           this.notification.showError(toastDetails);
         }
         file.nativeElement.value = '';
       };
       reader.readAsBinaryString(target.files[0]);

       reader.onerror = () => {
         file.nativeElement.value = '';
       };
    } else {
      toastDetails = {
        message: 'Error',
        details: 'Please import valid .csv file'
      };
      this.notification.showError(toastDetails);
      file.nativeElement.value = '';
    }
  }
}
