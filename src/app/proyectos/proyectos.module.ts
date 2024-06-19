import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos de estilos de la plantilla
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

// Propias de la plantilla
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { ProyectosRoutingModule } from './proyectos-routing.module';

// Componentes hechos por mi
import { DatatableComponent } from './components/datatable/datatable.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ModalProyectoComponent } from './components/modal-proyecto/modal-proyecto.component';
import { FormProyectoComponent } from './components/form-proyecto/form-proyecto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalTareasProyectoComponent } from './components/modal-tareas-proyecto/modal-tareas-proyecto.component';
import { ButtonsPrioridadComponent } from './components/buttons-prioridad/buttons-prioridad.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [
    DatatableComponent,
    ProyectoComponent,
    ModalProyectoComponent,
    ModalTareasProyectoComponent,
    FormProyectoComponent,
    ButtonsPrioridadComponent,
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    NzSkeletonModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    FormsModule,ReactiveFormsModule,
    NzDatePickerModule,
    NzButtonModule,
    NzCheckboxModule,
    NzCollapseModule,
  ],
  providers: [
    ThemeConstantService
  ]
})
export class ProyectosModule { }
