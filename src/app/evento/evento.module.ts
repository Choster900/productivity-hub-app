import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { NzDropDownModule} from 'ng-zorro-antd/dropdown';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDemoModalBasicEventoComponent } from './components/basic';
import { NzModalTareasComponent } from './components/NzModalTareasComponent';
import { NzCheckboxComponent, NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropdownPrioridadesComponent } from './components/dropdownPrioridades';

import { EventoRoutingModule } from './evento-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DemoComponentsShareModule } from '../components/demo-components-share/demo-components-share.module';
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { EventoComponent } from './evento/evento.component';
import { EventoTableComponent } from './components/eventoTable.component';
import { DatepickerEventoComponent } from './components/datepicker';
import { FormRegisterEventoComponent } from './components/custom-validations';
import { PrioridadGroupButtonComponent } from './components/PrioridadGroupButtonComponent';

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
    /* EventoTableComponent,
    NzModalComponent,
    NzCheckboxComponent, */
  ],
  providers: [
    ThemeConstantService
  ]
})
export class EventoModule { }
