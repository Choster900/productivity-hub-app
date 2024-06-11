import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Evento } from '../interfaces/evento';

@Component({
  selector: 'nz-demo-modal-basic-evento',
  template: `



    <nz-modal [(nzVisible)]="isVisible" [nzWidth]="700"  [nzFooter]="modalFooter" (nzOnCancel)="handleCancel()" nzTitle="Agregando un nuevo evento">
      <ng-container *nzModalContent>
        <form-register-evento [eventToEdit]="EventoToEdit"  (eventoAdded)="handleEventoAdded()"></form-register-evento>
      </ng-container>
      <ng-template #modalFooter>
        <!-- <button class="hover:bg-gray-hbr border-solid border-1 dark:bg-transparent border-normal dark:border-white/10 text-light dark:text-white/60 dark:focus:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]" nz-button nzType="default" (click)="handleCancel()">Cancel</button>
        <button class="bg-primary hover:bg-primary-hbr hover:border-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]" nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading">Custom Submit</button> -->
      </ng-template>
    </nz-modal>
  `
})
export class NzDemoModalBasicEventoComponent {
  @Output() whenEventoWasAddedAndModalWasClosed = new EventEmitter<void>();
  @Input() isVisible:Boolean
  @Input() EventoToEdit:Evento

  //isVisible = false;

  constructor() { }



  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.EventoToEdit = null;
    this.whenEventoWasAddedAndModalWasClosed.emit();

  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.EventoToEdit = null;
    this.whenEventoWasAddedAndModalWasClosed.emit();


  }

  handleEventoAdded(): void {
    // Cerrar el modal
    this.isVisible = false;
    this.EventoToEdit = null;

    console.log('Evento añadido, cerrando el modal');

    this.whenEventoWasAddedAndModalWasClosed.emit();

  }
}
