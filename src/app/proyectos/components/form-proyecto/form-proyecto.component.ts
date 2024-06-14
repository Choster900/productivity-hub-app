import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../interfaces/proyecto.interface';

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

    constructor(
        private fb: FormBuilder,
        private proyectoService: ProyectoService
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

    setFormValues(proyecto: Proyecto): void {
        this.validateForm.patchValue({
            id: proyecto.id,
            titulo: proyecto.nombre,
            descripcion: proyecto.descripcion,
        });
    }



    submitForm(): void {
        if (this.validateForm.valid) {

            const formValue = this.validateForm.value;

            console.log(formValue);

            if (!formValue.id) {
                this.proyectoService.addProyecto(formValue).subscribe({
                    next: (response) => {
                        console.log('Proyecto añadido con éxito', response);
                    },
                    error: (error) => {
                        // Manejar el error
                        console.error('Error añadiendo el evento', error);
                    },
                    complete: () => {
                        // Acción opcional cuando la solicitud se complete
                        console.log('Solicitud completada');
                    },
                });
                return
            }

            this.proyectoService.updateProyecto(formValue).subscribe({
                next: (response) => {
                    console.log('Proyecto actualziado con éxito', response);
                },
                error: (error) => {
                    // Manejar el error
                    console.error('Error añadiendo el evento', error);
                },
                complete: () => {
                    // Acción opcional cuando la solicitud se complete
                    console.log('Solicitud completada');
                },
            });




        } else {
            Object.values(this.validateForm.controls).forEach((control) => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

}
