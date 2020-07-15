import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '@core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimengModule} from '@shared/primeng.module';
import {TemplateModule} from '@shared/templates/template.module';
import {StocksRoutingModule} from '@features/stocks/stocks-routing.module';
import {StocksComponent} from '@features/stocks/stocks.component';
import {UserStockDetailsComponent} from '@features/stocks/user-stock-details/user-stock-details.component';
import {TradeStockComponent} from '@features/stocks/dialogs/trade-stock/trade-stock.component';
import {DeleteStocksComponent} from '@features/stocks/dialogs/delete-stocks/delete-stocks.component';
import {UserStockHistoryComponent} from '@features/stocks/user-stock-history/user-stock-history.component';
import {CalendarModule} from 'primeng';
import {AddStocksComponent} from '@features/stocks/dialogs/add-stocks/add-stocks.component';

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
    AddStocksComponent,
    DeleteStocksComponent,
    UserStockDetailsComponent,
    UserStockHistoryComponent
    ]
})
export class StocksModule { }
