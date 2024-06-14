import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'buttons-prioridad-component',
    template: `
    <nz-button-group>
      <button
        class="text-[13px] font-semibold px-[8px] capitalize"
        [class.active]="prioridadSeleccionada === 1"
        (click)="prioridadSeleccionada = 1; priorityWasSelected.emit(1)"
        nz-button
      >
        Alta
      </button>
      <button
        class="text-[13px] font-semibold px-[8px] capitalize"
        [class.active]="prioridadSeleccionada === 2"
        (click)="prioridadSeleccionada = 2; priorityWasSelected.emit(2)"
        nz-button
      >
        Media
      </button>
      <button
        class="text-[13px] font-semibold px-[8px] capitalize"
        [class.active]="prioridadSeleccionada === 3"
        (click)="prioridadSeleccionada = 3; priorityWasSelected.emit(3)"
        nz-button
      >
        Baja
      </button>
    </nz-button-group>
  `,
    styles: [
        `
      [nz-button] {
        margin-bottom: 12px;
      }

      nz-button-group {
        margin-bottom: 8px;
        margin-right: 8px;
      }

      .active {
        background-color: #8231d3; /* Color de fondo cuando el botón está activo */
        color: white; /* Color de texto cuando el botón está activo */
      }
    `,
    ],
})
export class ButtonsPrioridadComponent {
    @Output() priorityWasSelected = new EventEmitter<number>();
    @Input() public prioridadSeleccionada: 1 | 2 | 3 = 1;
}
