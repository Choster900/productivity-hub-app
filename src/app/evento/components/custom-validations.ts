import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'form-register-evento',
  template: `
    <form
      class="max-w-full"
      nz-form
      [formGroup]="validateForm"
      (ngSubmit)="submitForm()"
    >
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
            ngModel
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
          nzErrorTip="El tipo de evento es requerdio!"
        >
          <nz-select
            formControlName="idTipoEvento"
            id="idTipoEvento"
            class="basic-select"
            name="basicSelect"
            ngModel=""
          >
            <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
            <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
          </nz-select>
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
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };


  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
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
    console.log('Selected Time: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log('onCalendarChange', result);
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

  constructor(private fb: UntypedFormBuilder, private eventosService : EventosService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      titulo: [null, [Validators.required]],
      fechaInicioFin: [null, [Validators.required]],
      idTipoEvento: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      /*   username: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      zip: [null, [Validators.required]],
      agree: [false], */
    });
  }
}
