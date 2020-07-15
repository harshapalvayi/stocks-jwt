import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserToken} from '@models/User';
import {UserService} from '@shared/services/user/user.service';
import {AccountService} from '@shared/services/account/account.service';
import {TokenStorageService} from '@shared/services/token-storage/token-storage.service';
import {OptionsService} from '@shared/services/options/options.service';
import {OptionInfo} from '@models/options';

@Component({
  selector: 'app-delete-option',
  templateUrl: './delete-option.component.html',
  styleUrls: ['./delete-option.component.sass']
})
export class DeleteOptionComponent implements OnInit {

  @Output() deleted = new EventEmitter<string>();

  public showFlag: boolean;
  public option: OptionInfo;
  public userInfo: UserToken;

  constructor(private userService: UserService,
              private optionService: OptionsService,
              private accountService: AccountService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.userInfo = this.tokenService.getUserDetails();
    }
  }

  showDialog(option: OptionInfo) {
    this.option = option;
    this.showFlag = true;
  }

  onCancel() {
    this.showFlag = false;
  }

  onSubmitOption() {
    if (this.option && this.userInfo && this.userInfo.id) {
      const optionId = this.option.optionId;
      const userId = this.userInfo.id;
      this.optionService.delete(optionId, userId).subscribe(() => {
        this.deleted.emit('deleted');
        this.showFlag = false;
      }, error => {
        console.log('error', error);
      });
    }
  }

}
