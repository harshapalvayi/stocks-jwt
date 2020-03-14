import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {CoreModule} from '@core/core.module';
import {TemplateModule} from '@shared/templates/template.module';
import {PrimengModule} from '@shared/primeng.module';
import {AddStocksComponent} from '@features/dashboard/add-stocks/add-stocks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    PrimengModule,
    TemplateModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent, AddStocksComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule {}
