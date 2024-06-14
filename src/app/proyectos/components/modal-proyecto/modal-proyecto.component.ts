import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormProyectoComponent } from '../form-proyecto/form-proyecto.component';
import { Proyecto } from '../../interfaces/proyecto.interface';

@Component({
    selector: 'modal-proyecto-component',
    templateUrl: './modal-proyecto.component.html',
    styles: [
        `
      :host {
        display: block;
      }
    `,
    ],
})
export class ModalProyectoComponent {
    @Input() wasOpen: Boolean;
    @Input() public proyectoForEdit: Proyecto;

    @Output() wasClosed = new EventEmitter<void>();

    @ViewChild(FormProyectoComponent) formProyectoComponent: FormProyectoComponent;


    handleOk(): void {
      if (this.formProyectoComponent) {
        this.formProyectoComponent.submitForm();
      }
    }

    handleCancel(): void {
        this.wasClosed.emit();
    }
}
