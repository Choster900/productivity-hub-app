import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectoComponent } from './proyecto/proyecto.component';


const routes: Routes = [
  {
    path: 'proyecto',
    component: ProyectoComponent,
    data: {
        title: 'proyecto'
    }
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
