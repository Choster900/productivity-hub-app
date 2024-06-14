import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { EventosService } from '../services/eventos.service';
import { Evento, TipoEvento } from '../interfaces/evento';

@Component({
    selector: 'form-register-evento',
    template: `
    <form
      class="max-w-full"
      nz-form
      [formGroup]="validateForm"
      (ngSubmit)="submitForm()"
    >
    <!-- <pre>
      {{ eventToEdit | json }}
    </pre> -->
    <input
          class="hidden"
            nz-input
            formControlName="id"
            id="id"
            placeholder="id del evento"
          />
      <nz-form-item nzGutter="25" class="mb-0">
        <nz-form-control
          nxMd="8"
          nzXs="24"
          class="mb-[10px]"
          nzErrorTip="El titulo es un campo requerido!"
        >
          <nz-form-label
            class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 mb-[10px] p-0 text-[15px] capitalize"
            nzRequired
            nzFor="titulo"
            >Titulo del evento</nz-form-label
          >
          <input
            class="w-full rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
            nz-input
            formControlName="titulo"
            id="titulo"
            placeholder="Titulo del evento"
          />
        </nz-form-control>

        <nz-form-control
          nxMd="8"
          nzXs="24"
          class="mb-[10px]"
          nzErrorTip="la fecha inicio y fecha fin es un campo requerido!"
        >
          <nz-form-label
            class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 mb-[10px] p-0 text-[15px] capitalize"
            nzRequired
            nzFor="fechaInicioFin"
            >Fecha de inicio y fin del evento</nz-form-label
          >

          <nz-range-picker
            formControlName="fechaInicioFin"
            id="fechaInicioFin"
            class="inline-flex items-center rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] h-[50px] outline-none placeholder:text-light placeholder:font-normal text-theme-gray dark:text-white/60 w-[280px]"
            [nzShowTime]="{ nzFormat: 'HH:mm' }"
            nzFormat="yyyy-MM-dd HH:mm"

            (ngModelChange)="onChange($event)"
            (nzOnCalendarChange)="onCalendarChange($event)"
            (nzOnOk)="onOk($event)"
          ></nz-range-picker>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item nzGutter="25" class="mb-0">
    <nz-form-label
      class="flex items-center h-8 font-medium dark:text-white/60 mb-[10px]"
      nzXs="24"
      nzRequired
      nzFor="idTipoEvento"
      >Seleccione tipo de evento
    </nz-form-label>
    <nz-form-control
      nxMd="8"
      nzXs="24"
      class="mb-[10px]"
      nzErrorTip="El tipo de evento es requerido!"
    >
      <select
        formControlName="idTipoEvento"
        id="idTipoEvento"
        class="w-full rounded-md border border-gray-300 dark:border-gray-600 text-sm dark:bg-gray-700 dark:text-white p-2"
      >
        <option value="1">Cumpleaños</option>
        <option value="2">Aniversario</option>
        <option value="3">Navidad</option>
        <option value="4">Día del Padre</option>
        <option value="5">Día de la Madre</option>
      </select>
    </nz-form-control>
  </nz-form-item>
      <nz-form-item nzGutter="25" class="mb-0">
        <nz-form-control
          nxMd="8"
          nzXs="24"
          class="mb-[10px]"
          nzErrorTip="La descripcion es un campo requerido!"
        >
          <nz-form-label
            class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 mb-[10px] p-0 text-[15px] capitalize"
            nzRequired
            nzFor="descripcion"
            >Descripcion del evento</nz-form-label
          >
          <textarea
            formControlName="descripcion"
            id="descripcion"
            nzRequired
            nzFor="descripcion"
            class="w-full rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
            rows="4"
            nz-input
          ></textarea>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item nz-row class="register-area" class="mb-0">
        <nz-form-control>
          <button
            class="bg-primary hover:bg-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[30px] h-[44px]"
            nz-button
            nzType="primary"
          >
            Agregar evento
          </button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
})
export class FormRegisterEventoComponent implements OnInit {
    validateForm!: FormGroup;
    captchaTooltipIcon: NzFormTooltipIcon = {
        type: 'info-circle',
        theme: 'twotone',
    };

    @Output() eventoAdded = new EventEmitter<void>();


    @Input() eventToEdit: Evento; // Input para recibir la información del evento



    submitForm(): void {
        if (this.validateForm.valid) {
            /*  console.log('submit', this.validateForm.value); */

            const formValue = this.validateForm.value;
            // console.log('submit', this.validateForm.value)

            const transformedEvento = this.eventToEdit
                ? this.transformToEventoForEdit(formValue)
                : this.transformToEvento(formValue);



            console.log(transformedEvento);

            if (!transformedEvento.id) {
                this.eventosService.addEvento(transformedEvento).subscribe({
                    next: (response) => {
                        // Manejar la respuesta
                        console.log('Evento añadido con éxito', response);
                        // Emitir el evento al componente padre
                        this.eventoAdded.emit();
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

            this.eventosService.updateEvento(transformedEvento).subscribe({
                next: (response) => {
                    // Manejar la respuesta
                    console.log('Evento modificado con éxito', response);
                    // Emitir el evento al componente padre
                    this.eventoAdded.emit();
                },
                error: (error) => {
                    // Manejar el error
                    console.error('Error modificado el evento', error);
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

    onChange(result: Date): void {
        // console.log('Selected Time: ', result);
    }

    onOk(result: Date | Date[] | null): void {
        // console.log('onOk', result);
    }

    onCalendarChange(result: Array<Date | null>): void {
        // console.log('onCalendarChange', result);
    }

    updateConfirmValidator(): void {
        /** wait for refresh value */
        Promise.resolve().then(() =>
            this.validateForm.controls.checkPassword.updateValueAndValidity()
        );
    }

    confirmationValidator = (
        control: UntypedFormControl
    ): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    getCaptcha(e: MouseEvent): void {
        e.preventDefault();
    }

    constructor(
        private fb: FormBuilder,
        private eventosService: EventosService
    ) { }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: this.eventToEdit ? this.eventToEdit.id : null,
            titulo: [this.eventToEdit ? this.eventToEdit.titulo : null, [Validators.required]],
            fechaInicioFin: [this.eventToEdit ? [this.eventToEdit.fechaInicio, this.eventToEdit.fechaFin] : null, [Validators.required]],
            idTipoEvento: [this.eventToEdit ? this.eventToEdit.tipoEvento.id : null, [Validators.required]],
            descripcion: [this.eventToEdit ? this.eventToEdit.descripcion : null, [Validators.required]],
        });
        if (this.eventToEdit) {
            this.setFormValues(this.eventToEdit); // Asignar valores del evento al formulario si existe
        }
    }

    setFormValues(evento: Evento): void {
        //console.log(evento);

        this.validateForm.patchValue({
            id: evento.id,
            titulo: evento.titulo,
            fechaInicioFin: [new Date(evento.fechaInicio), new Date(evento.fechaFin)],
            idTipoEvento: evento.tipoEvento.id,
            descripcion: evento.descripcion,
        });
    }

    private transformToEvento(formValue: any): Evento {
        // Transformar fechaInicioFin a un solo Date (puedes ajustar según tus necesidades)
        const fechaInicio = new Date(formValue.fechaInicioFin[0]);
        const fechaFin = new Date(formValue.fechaInicioFin[1]);

        // Crear el objeto Evento
        const evento: Evento = {
            titulo: formValue.titulo,
            descripcion: formValue.descripcion,
            fechaInicio: fechaInicio, // O usa otra lógica para decidir qué fecha usar
            fechaFin: fechaFin, // O usa otra lógica para decidir qué fecha usar
            idTipoEvento: formValue.idTipoEvento,
        };

        return evento;
    }
    private transformToEventoForEdit(formValue: any): Evento {
        // Transformar fechaInicioFin a un solo Date (puedes ajustar según tus necesidades)
        const fechaInicio = new Date(formValue.fechaInicioFin[0]);
        const fechaFin = new Date(formValue.fechaInicioFin[1]);

        // Crear el objeto Evento
        const evento: Evento = {
            id: formValue.id,
            titulo: formValue.titulo,
            descripcion: formValue.descripcion,
            fechaInicio: fechaInicio, // O usa otra lógica para decidir qué fecha usar
            fechaFin: fechaFin, // O usa otra lógica para decidir qué fecha usar
            idTipoEvento: formValue.idTipoEvento,
        };

        return evento;
    }
}
