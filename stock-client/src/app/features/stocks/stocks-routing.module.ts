import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StocksComponent} from '@features/stocks/stocks.component';

const stockRoutes: Routes = [
  {
    path: '',
    component: StocksComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(stockRoutes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
