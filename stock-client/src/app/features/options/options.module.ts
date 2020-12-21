import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import { OptionsRoutingModule } from './options-routing.module';
import {CalendarModule} from 'primeng';
import {CoreModule} from '@core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OptionsComponent} from '@features/options/options.component';
import {AddOptionsComponent} from '@features/options/dialogs/add-options/add-options.component';
import {TradeOptionsComponent} from '@features/options/dialogs/trade-options/trade-options.component';
import {DeleteOptionComponent} from '@features/options/dialogs/delete-option/delete-option.component';
import {UserOptionsDetailsComponent} from '@features/options/user-options-details/user-options-details.component';
import {UserOptionActivityComponent} from '@features/options/user-option-activity/user-option-activity.component';
import {SearchOptionsComponent} from '@features/options/dialogs/search-options/search-options.component';
import {AddUserOptionsComponent} from '@features/options/add-user-options/add-user-options.component';
import {PrimengModule} from '@shared/primeng.module';
import {TemplateModule} from '@shared/templates/template.module';
import {OptionDashboardComponent} from '@features/options/option-dashboard/option-dashboard.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    PrimengModule,
    TemplateModule,
    CalendarModule,
    ReactiveFormsModule,
    OptionsRoutingModule
  ],
  declarations: [
    OptionsComponent,
    AddOptionsComponent,
    TradeOptionsComponent,
    DeleteOptionComponent,
    SearchOptionsComponent,
    AddUserOptionsComponent,
    OptionDashboardComponent,
    UserOptionActivityComponent,
    UserOptionsDetailsComponent,
  ],
  providers: [CurrencyPipe],
  exports: [AddUserOptionsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OptionsModule {}
