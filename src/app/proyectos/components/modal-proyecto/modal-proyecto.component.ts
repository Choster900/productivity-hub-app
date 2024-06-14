import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormProyectoComponent } from '../form-proyecto/form-proyecto.component';

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
    @Output() wasClosed = new EventEmitter<void>();


    @ViewChild(FormProyectoComponent) formProyectoComponent: FormProyectoComponent;



    handleOk(): void {
      if (this.formProyectoComponent) {
        this.formProyectoComponent.submitForm();
      }

        //this.wasClosed.emit();
    }

    handleCancel(): void {
        this.wasClosed.emit();
    }
}
