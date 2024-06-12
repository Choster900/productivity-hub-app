import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Evento } from '../interfaces/evento';
import { EventosService } from '../services/eventos.service';
import { TareasEvento } from '../interfaces/tareas-eventos';

@Component({
  selector: 'nz-modal-tareas',
  template: `
    <nz-modal
      [(nzVisible)]="isVisible"
      [nzWidth]="700"
      [nzFooter]="modalFooter"
      (nzOnCancel)="handleCancel()"
      nzTitle="Agregar tareas"
    >
      <ng-container *nzModalContent>

        <nz-collapse class="bg-transparent" [nzBordered]="false">
          <nz-collapse-panel
            class="{{ collapsePanelClass }}"
            *ngFor="let item of tareas"
            [nzHeader]="item.titulo"
            [nzActive]="item.active"
          >
            <input
              class="w-full rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
              nz-input
              [(ngModel)]="item.titulo"
              placeholder="Titulo del evento"
            />
            <div *ngIf="item.subtareas && item.subtareas.length > 0">
              <nz-collapse
                class="bg-transparent mt-[20px]"
                [nzBordered]="false"
              >
                <!--  <nz-collapse-panel class="{{collapsePanelClass}}" *ngFor="let childPanel of panel.childPanel" [nzHeader]="childPanel.name" [nzActive]="childPanel.active">
             </nz-collapse-panel> -->
                <p
                  *ngFor="let subItem of item.subtareas"
                  class="flex gap-4 text-[15px] font-normal text-light dark:text-white/60 py-1 pl-5"
                >
                  <input
                    class="w-full rounded-6 border-normal border-1 h-8 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px]  outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
                    nz-input
                    [(ngModel)]="subItem.titulo"
                    placeholder="Titulo del evento"
                  />
                  <nz-dropdown-prioridades></nz-dropdown-prioridades>
                </p>
              </nz-collapse>
            </div>
          </nz-collapse-panel>
        </nz-collapse>

        <pre>
        {{ tareas | json }}
        </pre>
      </ng-container>
      <ng-template #modalFooter>
        <!-- <button class="hover:bg-gray-hbr border-solid border-1 dark:bg-transparent border-normal dark:border-white/10 text-light dark:text-white/60 dark:focus:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]" nz-button nzType="default" (click)="handleCancel()">Cancel</button>
        <button class="bg-primary hover:bg-primary-hbr hover:border-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]" nz-button nzType="primary" (click)="handleOk()" [nzLoading]="isConfirmLoading">Custom Submit</button> -->
      </ng-template>
    </nz-modal>
  `,
  styles: [
    `
      :host
        ::ng-deep
        .ant-collapse
        > .ant-collapse-item
        > .ant-collapse-header {
        @apply text-15 font-normal text-dark/[.85] dark:text-white/[.87];
      }
      :host ::ng-deep .ant-collapse-borderless > .ant-collapse-item:last-child {
        @apply border-b-1 border-regular dark:border-white/10 border-solid;
      }
      :host ::ng-deep .ant-collapse-content > .ant-collapse-content-box {
        @apply px-6 pt-5 pb-[30px] #{!important};
      }
      :host
        ::ng-deep
        .ant-collapse
        > .ant-collapse-item
        > .ant-collapse-header
        .ant-collapse-arrow {
        @apply text-[9px] text-light dark:text-white/60;
      }
    `,
  ],
})
export class NzModalTareasComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Input() isVisible: Boolean;
  @Input() EventoToEdit: Evento;

  //isVisible = false;

  public tareas: TareasEvento;

  constructor(private eventoService: EventosService) {}

  ngOnInit(): void {
    this.getTareasByEventoId();
  }

  getTareasByEventoId(eventoId?: number): void {
    this.eventoService.getTareasByEvento(1).subscribe({
      next: (response) => {
        // Manejar la respuesta
        console.log('tareas[]', response);
        this.tareas = response;
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
  }

  handleOk(): void {
    this.isVisible = false;
    this.EventoToEdit = null;
    this.closeModal.emit();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.EventoToEdit = null;
    this.closeModal.emit();
  }

  collapsePanelClass: string =
    'mb-1 font-medium text-dark bg-transparent dark:text-white/[.87] text-15 border-regular border-1 dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none [&>.ant-collapse-header]:px-[20px] [&>.ant-collapse-header]:py-[12px] aria-expanded:[&>.ant-collapse-header]:border-b-1 [&>.ant-collapse-header]:border-regular dark:[&>.ant-collapse-header]:border-white/10';

}
