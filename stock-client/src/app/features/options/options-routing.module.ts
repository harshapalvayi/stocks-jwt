import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OptionsComponent} from '@features/options/options.component';


const optionsRoutes: Routes = [
  {
    path: '',
    component: OptionsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(optionsRoutes)],
  exports: [RouterModule]
})
export class OptionsRoutingModule { }
