import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';

const routes: Routes = [
  {
    path: 'tareas',
    component: CalendarPageComponent,
    data: {
      title: 'Calendario de tareas',
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarTaskRoutingModule {}
