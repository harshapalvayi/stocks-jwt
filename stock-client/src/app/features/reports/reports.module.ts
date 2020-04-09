import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportsRoutingModule} from './reports-routing.module';
import {ReportsComponent} from './reports.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MonthlyDividendsComponent} from './monthly-dividends/monthly-dividends.component';
import {PrimengModule} from '@shared/primeng.module';
import {TemplateModule} from '@shared/templates/template.module';
import {CoreModule} from '@core/core.module';
import {YearlyDividendsComponent} from '@features/reports/yearly-dividends/yearly-dividends.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    PrimengModule,
    TemplateModule,
    ReactiveFormsModule,
    ReportsRoutingModule
  ],
  declarations: [
    ReportsComponent,
    YearlyDividendsComponent,
    MonthlyDividendsComponent
  ],
  providers: [FormBuilder],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
