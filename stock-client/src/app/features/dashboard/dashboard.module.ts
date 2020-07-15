import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {CoreModule} from '@core/core.module';
import {TemplateModule} from '@shared/templates/template.module';
import {PrimengModule} from '@shared/primeng.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng';
import {PortfolioComponent} from '@features/dashboard/portfolio/portfolio.component';

@NgModule({
    imports: [
      CoreModule,
      FormsModule,
      CommonModule,
      TemplateModule,
      PrimengModule,
      CalendarModule,
      ReactiveFormsModule,
      DashboardRoutingModule
    ],
  declarations: [
    DashboardComponent,
    PortfolioComponent
  ],
  providers: [CurrencyPipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule {}
