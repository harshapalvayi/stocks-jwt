import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimengModule} from '@shared/primeng.module';
import {CardsComponent} from '@shared/templates/cards/cards.component';
import {NotificationComponent} from '@shared/templates/notification/notification.component';
import {MessageComponent} from '@shared/templates/message/message.component';
import {AutoPlayCardsComponent} from '@shared/templates/auto-play-cards/auto-play-cards.component';
import {LineCardsComponent} from '@shared/templates/line-cards/line-cards.component';
import {BarCardsComponent} from '@shared/templates/bar-cards/bar-cards.component';
import {DisplayCardsComponent} from '@shared/templates/display-cards/display-cards.component';
import {LoaderComponent} from '@shared/templates/loader/loader.component';
import {TopMoversComponent} from '@shared/templates/top-movers/top-movers.component';
import {PieCardsComponent} from '@shared/templates/pie-cards/pie-cards.component';
import {SemiPieCardsComponent} from '@shared/templates/semi-pie-cards/semi-pie-cards.component';
import {DoughnutChartComponent} from '@shared/templates/doughnut-chart/doughnut-chart.component';

@NgModule({
  imports: [
    CommonModule,
    PrimengModule
  ],
  declarations: [
    LoaderComponent,
    PieCardsComponent,
    CardsComponent,
    MessageComponent,
    DisplayCardsComponent,
    BarCardsComponent,
    LineCardsComponent,
    TopMoversComponent,
    AutoPlayCardsComponent,
    NotificationComponent,
    SemiPieCardsComponent,
    DoughnutChartComponent
  ],
  exports: [
    LoaderComponent,
    CardsComponent,
    MessageComponent,
    PieCardsComponent,
    DisplayCardsComponent,
    BarCardsComponent,
    LineCardsComponent,
    TopMoversComponent,
    AutoPlayCardsComponent,
    NotificationComponent,
    SemiPieCardsComponent,
    DoughnutChartComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TemplateModule { }
