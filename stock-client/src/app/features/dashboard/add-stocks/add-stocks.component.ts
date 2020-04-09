import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Share, ShareList} from '@models/stock';
import {User, UserToken} from '@models/User';
import {ToastDetails} from '@models/Notification';
import {UserService} from '@shared/services/user/user.service';
import {SharesService} from '@shared/services/shares/shares.service';
import {ExcelService} from '@shared/services/excel/excel.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {NotificationService} from '@shared/services/notification/notification.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-stocks',
  templateUrl: './add-stocks.component.html',
  styleUrls: ['./add-stocks.component.sass']
})
export class AddStocksComponent implements OnInit {

  @ViewChild('uploadFile', {static: false}) file;
  @Output() saved = new EventEmitter<string>();

  public userInfo: UserToken;
  public addStock: FormGroup;
  public showFlag: boolean;
  public text: string;

  constructor(private userService: UserService,
              private excelService: ExcelService,
              private shareService: SharesService,
              private tokenService: TokenStorageService,
              private notification: NotificationService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
      this.createForm();
    }
  }

  createForm() {
    this.text  = `To upload all your stocks at once make an excel file of your stocks with
                    <b>Ticker</b>, <b>Shares</b> and <b>Buy</b> as columns and upload the file`;
    this.addStock = this.shareService.create();
  }

  resetStock() {
    this.addStock.reset();
  }

  showDialog() {
    this.showFlag = true;
  }

  onCancel() {
    this.resetStock();
    this.showFlag = false;
  }

  onSubmitStock() {
    const share = this.addStock.getRawValue();
    if (share && this.userInfo && this.userInfo.id) {
      const user = new User();
      user.userid = this.userInfo.id;
      const shareData: Share = {
        ticker: share.ticker,
        buy: share.buy,
        shares: share.shares,
        getUserInfo(): User { return user; },
      };
      this.shareService.save(shareData).subscribe(() => {
        this.saved.emit('saved');
        this.resetStock();
        this.showFlag = false;
      });
    }
  }

  onUpload(event) {
    this.processExcelFile(event);
    this.resetStock();
    this.showFlag = false;
  }

  public processExcelFile(event) {
    let jsonRecords: ShareList[] = [];
    let toastDetails: ToastDetails = {};
    const reader: FileReader = new FileReader();
    const target: DataTransfer = (event.target) as DataTransfer;

    if (event && ExcelService.isXlsxFile(target.files[0])) {
      if (target.files.length !== 1) {
        toastDetails = {
          message: 'Error',
          details: 'Cannot use multiple Files'
        };
        this.notification.showError(toastDetails);
      }

      reader.onload = (e: any) => {
        /* Read Workbook */
        const book: string = e.target.result;
        const workBook: XLSX.WorkBook = XLSX.read(book, {type: 'binary'});

        /* Grab First Sheet */
        const sheet: string = workBook.SheetNames[0];
        const workSheet: XLSX.WorkSheet = workBook.Sheets[sheet];

        /* Save Data */
        const headers = XLSX.utils.sheet_to_json(workSheet, {header: 1})[0];

        if (ExcelService.checkHeaders(headers)) {
          const records = XLSX.utils.sheet_to_json(workSheet, {raw: true});
          jsonRecords = this.excelService.buildJsonObjectFromRecords(records);
          if (jsonRecords && jsonRecords.length > 0) {
            this.shareService.uploadStockFile(jsonRecords, this.userInfo.id).subscribe(res => {
              if (res && res.status === 'SUCCESS') {
                toastDetails = {
                  message: 'Success',
                  details: 'File Uploaded Successfully'
                };
                this.file.nativeElement.value = '';
                this.notification.showSuccess(toastDetails);
                this.saved.emit('saved');
              } else {
                toastDetails = {
                  message: 'Error',
                  details: 'Failed to Upload File'
                };
                this.file.nativeElement.value = '';
                this.notification.showError(toastDetails);
              }
            });
          } else {
            this.file.nativeElement.value = '';
          }
        } else {
          toastDetails = {
            message: 'Error',
            details: 'Invalid Headers'
          };
          this.file.nativeElement.value = '';
          this.notification.showError(toastDetails);
        }
      };
      reader.readAsBinaryString(target.files[0]);
      reader.onerror = () => {
        this.file.nativeElement.value = '';
      };
    } else {
      toastDetails = {
        message: 'Error',
        details: 'Please import valid .csv file'
      };
      this.file.nativeElement.value = '';
      this.notification.showError(toastDetails);
    }
  }
}
