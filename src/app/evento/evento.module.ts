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

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalComponent } from 'ng-zorro-antd/modal';
import { NzDemoModalBasicEventoComponent } from './components/basic';
import { FormRegisterEventoComponent } from './components/custom-validations';

@NgModule({
  declarations: [
    EventoComponent,
    EventoTableComponent,
    NzDemoModalBasicEventoComponent,
    FormRegisterEventoComponent,
  ],
  imports: [
    CommonModule,
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
    NzSkeletonModule
  ],
  exports: [
    EventoTableComponent,
    NzModalComponent,
  ],
  providers: [
    ThemeConstantService
  ]
})
export class EventoModule { }
