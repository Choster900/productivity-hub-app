import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

import { EventoRoutingModule } from './evento-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { DemoComponentsShareModule } from '../components/demo-components-share/demo-components-share.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { EventoComponent } from './evento/evento.component';
import { EventoTableComponent } from './components/eventoTable.component';
/* NzDropdownMenu */

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { NzDemoModalBasicEventoComponent } from './components/basic';
import { FormRegisterEventoComponent } from './components/custom-validations';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DatepickerEventoComponent } from './components/datepicker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalTareasComponent } from './components/NzModalTareasComponent';
import { NzDropdownPrioridadesComponent } from './components/dropdownPrioridades';
import { NzDropDownModule} from 'ng-zorro-antd/dropdown';
import { NzButtonGroupComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { PrioridadGroupButtonComponent } from './components/PrioridadGroupButtonComponent';
import { NzCheckboxComponent, NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [
    EventoComponent,
    EventoTableComponent,
    NzDemoModalBasicEventoComponent,
    FormRegisterEventoComponent,
   /*  FormsComponentsComponent, */
    DatepickerEventoComponent,

    // Tareas Compoent
    NzModalTareasComponent,
    NzDropdownPrioridadesComponent,
    PrioridadGroupButtonComponent,
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    NzButtonModule,
    NzDropDownModule,
    SharedModule,
    EventoRoutingModule,
    NzTableModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzCardModule,
    DemoComponentsShareModule,
    NzCollapseModule,
    NzSkeletonModule,
    NzDatePickerModule,
    NzCheckboxModule,
  ],
  exports: [
    EventoTableComponent,
    NzModalComponent,
    NzCheckboxComponent,
  ],
  providers: [
    ThemeConstantService
  ]
})
export class EventoModule { }
