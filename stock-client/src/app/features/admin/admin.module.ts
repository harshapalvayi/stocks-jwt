import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from '@features/admin/admin.component';
import {CoreModule} from '@core/core.module';
import {FormsModule} from '@angular/forms';
import {AdminRoutingModule} from '@features/admin/admin-routing.module';
import {SearchStockComponent} from '@features/admin/search-stock/search-stock.component';
import {PrimengModule} from '@shared/primeng.module';
import {TemplateModule} from '@shared/templates/template.module';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    PrimengModule,
    TemplateModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, SearchStockComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
