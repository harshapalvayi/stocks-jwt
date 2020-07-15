import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from '@core/landing-page/landing-page.component';
import {LoginPageComponent} from '@core/login-page/login-page.component';
import {ErrorComponent} from '@core/error/error.component';
import {RegisterComponent} from '@core/register/register.component';
import {LogoutComponent} from '@core/logout/logout.component';
import {RoleGuardService} from '@app/role-guard.service';
import {Authguard} from '@app/authguard';

const routes: Routes = [
  {
    path: 'app-landing-page',
    component: LandingPageComponent
  },
  {
    path: 'app-login-page',
    component: LoginPageComponent
  },
  {
    path: 'app-register',
    component: RegisterComponent
  },
  {
    path: 'app-logout',
    component: LogoutComponent
  },
  {
    path: 'app-dashboard',
    loadChildren: '@features/dashboard/dashboard.module#DashboardModule',
    canActivate: [RoleGuardService, Authguard]
  },
  {
    path: 'app-options',
    loadChildren: '@features/options/options.module#OptionsModule',
    canActivate: [RoleGuardService, Authguard]
  },
  {
    path: 'app-stocks',
    loadChildren: '@features/stocks/stocks.module#StocksModule',
    canActivate: [RoleGuardService, Authguard]
  },
  {
    path: 'app-reports',
    loadChildren: () => import('@features/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [RoleGuardService, Authguard]
  },
  {
    path: 'app-admin',
    loadChildren: '@features/admin/admin.module#AdminModule',
    canActivate: [RoleGuardService, Authguard]
  },
  {
    path: '',
    redirectTo: 'app-landing-page',
    pathMatch: 'full'
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
