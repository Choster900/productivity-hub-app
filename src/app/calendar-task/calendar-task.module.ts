import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarTaskRoutingModule } from './calendar-task-routing.module';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { MainCalendarTaskComponent } from './components/main-calendar-task/main-calendar-task.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [
    CalendarPageComponent,
    MainCalendarTaskComponent,

  ],
  imports: [
    CommonModule,
    CalendarTaskRoutingModule,
    FullCalendarModule,
    NzModalModule,
    NzRowDirective,
    NzColDirective,
  ]
})
export class CalendarTaskModule { }
