import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos de estilos de la plantilla
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzModalModule } from 'ng-zorro-antd/modal';

// Propias de la plantilla
import { ThemeConstantService } from '../shared/services/theme-constant.service';
import { ProyectosRoutingModule } from './proyectos-routing.module';

// Componentes hechos por mi
import { DatatableComponent } from './components/datatable/datatable.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ModalProyectoComponent } from './components/modal-proyecto/modal-proyecto.component';
import { FormProyectoComponent } from './components/form-proyecto/form-proyecto.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DatatableComponent,
    ProyectoComponent,
    ModalProyectoComponent,
    FormProyectoComponent,
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    NzSkeletonModule,
    NzModalModule,
    NzFormModule,
    FormsModule,ReactiveFormsModule,

  ],
  providers: [
    ThemeConstantService
  ]
})
export class ProyectosModule { }
