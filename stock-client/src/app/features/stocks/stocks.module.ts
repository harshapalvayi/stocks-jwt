import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '@core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng';
import {StocksRoutingModule} from '@features/stocks/stocks-routing.module';
import {StocksComponent} from '@features/stocks/stocks.component';
import {UserStockDetailsComponent} from '@features/stocks/user-stock-details/user-stock-details.component';
import {TradeStockComponent} from '@features/stocks/dialogs/trade-stock/trade-stock.component';
import {DeleteStocksComponent} from '@features/stocks/dialogs/delete-stocks/delete-stocks.component';
import {UserStockActivityComponent} from '@features/stocks/user-stock-activity/user-stock-activity.component';
import {AddUserStocksComponent} from '@features/stocks/add-user-stocks/add-user-stocks.component';
import {PrimengModule} from '@shared/primeng.module';
import {TemplateModule} from '@shared/templates/template.module';
import {StockDashboardComponent} from '@features/stocks/stock-dashboard/stock-dashboard.component';
import {StockPortfolioComponent} from '@features/stocks/stock-portfolio/stock-portfolio.component';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    PrimengModule,
    TemplateModule,
    ReactiveFormsModule,
    StocksRoutingModule,
    CalendarModule
  ],
  declarations: [
    StocksComponent,
    TradeStockComponent,
    StockDashboardComponent,
    DeleteStocksComponent,
    AddUserStocksComponent,
    StockPortfolioComponent,
    UserStockDetailsComponent,
    UserStockActivityComponent
    ]
})
export class StocksModule { }
