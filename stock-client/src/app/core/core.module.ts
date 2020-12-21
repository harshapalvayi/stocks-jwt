import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import {LogoutComponent} from '@core/logout/logout.component';
import {PrimengModule} from '@features/../shared/primeng.module';
import {RegisterComponent} from '@core/register/register.component';
import {TemplateModule} from '@features/../shared/templates/template.module';
import {UserProfileComponent} from '@core/user-profile/user-profile.component';

@NgModule({
  declarations: [
    ErrorComponent,
    HeaderComponent,
    LogoutComponent,
    FooterComponent,
    RegisterComponent,
    LoginPageComponent,
    LandingPageComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    TemplateModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    RegisterComponent,
    LoginPageComponent,
    UserProfileComponent,
    LandingPageComponent
  ]
})
export class CoreModule { }
