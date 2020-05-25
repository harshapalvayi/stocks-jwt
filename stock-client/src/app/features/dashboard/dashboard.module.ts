import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {CoreModule} from '@core/core.module';
import {TemplateModule} from '@shared/templates/template.module';
import {PrimengModule} from '@shared/primeng.module';
import {AddStocksComponent} from '@features/dashboard/dialogs/add-stocks/add-stocks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PortfolioComponent} from '@features/dashboard/portfolio/portfolio.component';
import {UserStockDetailsComponent} from '@features/dashboard/user-stock-details/user-stock-details.component';
import {TradeStockComponent} from '@features/dashboard/dialogs/trade-stock/trade-stock.component';
import {AddOptionsComponent} from '@features/dashboard/dialogs/add-options/add-options.component';
import {UserOptionsDetailsComponent} from '@features/dashboard/user-options-details/user-options-details.component';
import {TradeOptionsComponent} from '@features/dashboard/dialogs/trade-options/trade-options.component';

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
  declarations: [
    DashboardComponent,
    AddStocksComponent,
    AddOptionsComponent,
    TradeStockComponent,
    TradeOptionsComponent,
    UserOptionsDetailsComponent,
    PortfolioComponent,
    UserStockDetailsComponent
  ],
  providers: [CurrencyPipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule {}
