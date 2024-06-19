import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'form-proyecto-component',
    templateUrl: './form-proyecto.component.html',
    styles: [
        `
      :host {
        display: block;
      }
    `,
    ],
})
export class FormProyectoComponent implements OnInit {
    public validateForm!: FormGroup;
    @Input() proyectoForEdit: Proyecto; // Input para recibir la información del evento
    @Output() wasClosed = new EventEmitter<void>();

    constructor(
        private fb: FormBuilder,
        private proyectoService: ProyectoService,
        private modal: NzModalService,
        private notification: NzNotificationService,
    ) { }

    ngOnInit(): void {

        this.validateForm = this.fb.group({
            id: this.proyectoForEdit ? this.proyectoForEdit.id : null,
            nombre: [this.proyectoForEdit ? this.proyectoForEdit.nombre : null, [Validators.required]],
            descripcion: [this.proyectoForEdit ? this.proyectoForEdit.descripcion : null, [Validators.required]],
        });
        if (this.proyectoForEdit) {
            this.setFormValues(this.proyectoForEdit);
        }
    }

    confirmModal?: NzModalRef; // For testing by now

    showConfirm(): void {
        this.confirmModal = this.modal.confirm({
            nzTitle: 'Do you Want to delete these items?',
            nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
            nzOnOk: () =>
                new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);

                }).catch(() => console.log('Oops errors!'))
        });
    }

    setFormValues(proyecto: Proyecto): void {
        this.validateForm.patchValue({
            id: proyecto.id,
            titulo: proyecto.nombre,
            descripcion: proyecto.descripcion,
        });
    }



    submitForm(): void {
        this.confirmModal = this.modal.confirm({
            nzTitle: '¿Desea guardar los cambios?',
            nzContent: 'Los cambios se guardarán y se reflejarán de inmediato.',
            nzOnOk: async () => {
                try {
                    await this.waitForTimeout(1000); // Espera a que el timeout termine
                    if (this.validateForm.valid) {
                        const formValue = this.validateForm.value;
                        console.log(formValue);

                        if (!formValue.id) {
                            this.proyectoService.addProyecto(formValue).subscribe({
                                next: (response) => {
                                    console.log('Proyecto añadido con éxito', response);
                                    this.wasClosed.emit();
                                    this.createNotification('success', 'Proyecto Agregado', 'El proyecto se ha agregado exitosamente.');
                                },
                                error: (error) => {
                                    console.error('Error añadiendo el evento', error);
                                    this.createNotification('error', 'Error', 'Ocurrió un error al intentar agregar el proyecto.');

                                },
                                complete: () => {
                                    console.log('Solicitud completada');
                                },
                            });
                        } else {
                            this.proyectoService.updateProyecto(formValue).subscribe({
                                next: (response) => {
                                    console.log('Proyecto actualizado con éxito', response);
                                    this.wasClosed.emit();
                                    this.createNotification('success', 'Proyecto Actualizado', 'El proyecto se ha actualizado exitosamente.');

                                },
                                error: (error) => {
                                    console.error('Error actualizando el evento', error);
                                    this.createNotification('error', 'Error', 'Ocurrió un error al intentar actualizar el proyecto.');
                                },
                                complete: () => {
                                    console.log('Solicitud completada');
                                },
                            });
                        }
                    } else {
                        this.markFormControlsAsDirty();
                    }
                } catch (error) {
                    console.log('Oops errors!', error);
                    this.createNotification('error', 'Error', error);

                }
            }
        });
    }

    private waitForTimeout(timeout: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, timeout);
        });
    }

    private markFormControlsAsDirty(): void {
        Object.values(this.validateForm.controls).forEach((control) => {
            if (control.invalid) {
                control.markAsDirty();
                control.updateValueAndValidity({ onlySelf: true });
            }
        });
    }


    createNotification(type: string,title:string,content:string): void {
        this.notification.create(
          type,
          title,
          content
        );
      }

}
