import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { Evento } from '../interfaces/evento';
import { EventosService } from '../services/eventos.service';
import { Subtarea, TareasEvento } from '../interfaces/tareas-eventos';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
              class="hidden"
              [(ngModel)]="item.id"
              placeholder="id del evento"
            />
            <input
              *ngIf="item.etiqueta.id !== 3; else tituloTarea"
              class="w-full h-9 rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
              nz-input
              [(ngModel)]="item.titulo"
              placeholder="Titulo del evento"
            />
            <ng-template #tituloTarea>
              <div class=" flex gap-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  class="size-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 8c0 .982-.472 1.854-1.202 2.402a2.995 2.995 0 0 1-.848 2.547 2.995 2.995 0 0 1-2.548.849A2.996 2.996 0 0 1 8 15a2.996 2.996 0 0 1-2.402-1.202 2.995 2.995 0 0 1-2.547-.848 2.995 2.995 0 0 1-.849-2.548A2.996 2.996 0 0 1 1 8c0-.982.472-1.854 1.202-2.402a2.995 2.995 0 0 1 .848-2.547 2.995 2.995 0 0 1 2.548-.849A2.995 2.995 0 0 1 8 1c.982 0 1.854.472 2.402 1.202a2.995 2.995 0 0 1 2.547.848c.695.695.978 1.645.849 2.548A2.996 2.996 0 0 1 15 8Zm-3.291-2.843a.75.75 0 0 1 .135 1.052l-4.25 5.5a.75.75 0 0 1-1.151.043l-2.25-2.5a.75.75 0 1 1 1.114-1.004l1.65 1.832 3.7-4.789a.75.75 0 0 1 1.052-.134Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="">{{ item.titulo }}</span>
              </div>
            </ng-template>

            <textarea
              *ngIf="item.etiqueta.id !== 3; else decripcionTarea"
              [(ngModel)]="item.descripcion"
              class="w-full rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
              rows="4"
            ></textarea>
            <ng-template #decripcionTarea>
              <div class=" flex gap-3 items-center py-4">
                <span class="">{{ item.descripcion }}</span>
              </div>
            </ng-template>

            <div class="flex gap-4">
              <nz-button-priorida-group
                [prioridadSeleccionada]="item.prioridad.id || item.idPrioridad"
                (priorityWasSelected)="onChangePriority($event, item)"
              ></nz-button-priorida-group>

              <div class="flex gap">
                <nz-form-label
                  class="flex  font-normal capitalize dark:text-white/60"
                  nzLg="6"
                  nzMd="9"
                  nzXs="24"
                  nzFor="datePicker"
                  >Fecha Limite</nz-form-label
                >
                <nz-form-control>
                  <nz-date-picker
                    nzFormat="yyyy-MM-dd HH:mm"
                    [(ngModel)]="item.fechaLimite"
                    [nzShowTime]="{ nzFormat: 'HH:mm' }"
                    class="h-8 inline-flex items-center rounded-4 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px]  outline-none placeholder:text-light placeholder:font-normal text-theme-gray dark:text-white/60 w-[250px] mb-[15px]"
                    id="datePicker"
                  ></nz-date-picker>
                </nz-form-control>
              </div>
            </div>

            <div *ngIf="item.subtareas && item.subtareas.length > 0">
              <nz-collapse
                class="bg-transparent mt-[20px]"
                [nzBordered]="false"
              >
                <!--  <nz-collapse-panel class="{{collapsePanelClass}}" *ngFor="let childPanel of panel.childPanel" [nzHeader]="childPanel.name" [nzActive]="childPanel.active">
             </nz-collapse-panel> -->
                <div
                  *ngFor="let subItem of item.subtareas; let i = index"
                  class="flex gap-4 text-[15px] items-center font-normal text-light dark:text-white/60 py-1 pl-5"
                >
                  <label
                  [nzDisabled]="!subItem.id"
                  class="dark:text-white/[.87]"
                    nz-checkbox
                    [(ngModel)]="subItem.estado"
                    (change)="onClickInCheckBox(item, i)"
                  ></label>
                  <input
                    *ngIf="!subItem.estado; else tituloSubTarea"
                    class="w-full rounded-6 border-normal border-1 h-8 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px]  outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
                    nz-input
                    [(ngModel)]="subItem.titulo"
                    placeholder="Titulo del evento"
                  />
                  <ng-template #tituloSubTarea>
                    <div class=" flex gap-3 items-center">
                      <span class="line-through">{{ subItem.titulo }}</span>
                    </div>
                  </ng-template>
                  <svg *ngIf="!subItem.estado"
                    (click)="onDeleteSubTask(item, i)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="size-4 text-red-600 cursor-pointer hover:text-red-700"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="py-1 pl-5 w-full">
                  <div
                    (click)="onAddSubTask(item)"
                    class="w-full cursor-pointer flex justify-center items-center py-2 text-xs h-8 border-2 border-dashed border-slate-400"
                  >
                    <span class="mr-2">Agregar subtarea</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
                      />
                    </svg>
                  </div>
                </div>
              </nz-collapse>
            </div>
          </nz-collapse-panel>

          <div class="py-1  w-full">
            <div
              (click)="onAddTaskAndSubTask()"
              class="w-full cursor-pointer flex justify-center items-center py-2 text-xs h-8 border-2 border-dashed border-slate-400"
            >
              <span class="mr-2">Agregar nueva tarea</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
                />
              </svg>
            </div>
          </div>
        </nz-collapse>
      </ng-container>
      <ng-template #modalFooter>
        <button
          class="hover:bg-gray-hbr border-solid border-1 dark:bg-transparent border-normal dark:border-white/10 text-light dark:text-white/60 dark:focus:text-white/60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
          nz-button
          nzType="default"
          (click)="handleCancel()"
        >
          Cancel
        </button>
        <button
          class="bg-primary hover:bg-primary-hbr hover:border-primary-hbr border-solid border-1 border-primary text-white dark:text-white/[.87] text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
          nz-button
          nzType="primary"
          (click)="onSubmit()"
          [nzLoading]="isConfirmLoading"
        >
          Guardar y cerrar
        </button>
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

    public tareas: TareasEvento[];
    confirmModal?: NzModalRef; // For testing by now
    constructor(private eventoService: EventosService,
        private modal: NzModalService,
        private notification: NzNotificationService,
    ) { }

    ngOnInit(): void {
        // this.getTareasByEventoId(1); // Asegúrate de pasar un ID válido
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['EventoToEdit'] && this.EventoToEdit) {
            const eventoId = this.EventoToEdit.id;
            if (eventoId) {
                this.getTareasByEventoId(eventoId);
            }
        }
    }

    getTareasByEventoId(eventoId: number): void {
        this.eventoService.getTareasByEvento(eventoId).subscribe({
            next: (response: TareasEvento[]) => {
                console.log('tareas[]', response);
                this.tareas = response.map((tarea) => ({
                    ...tarea,
                    idPrioridad: tarea.prioridad.id, // Asigna idPrioridad basado en la propiedad id de prioridad
                }));
            },
            error: (error) => {
                console.error('Error obteniendo las tareas', error);
            },
            complete: () => {
                console.log('Solicitud completada');
            },
        });
    }

    onSubmit(): void {


        this.confirmModal = this.modal.confirm({
            nzTitle: '¿Desea guardar los cambios?',
            nzContent: 'Los cambios se guardarán y se reflejarán de inmediato.',
            nzOnOk: async () => {
                //await this.waitForTimeout(2000); // Espera a que el timeout termine

                this.tareas.forEach((element) => {
                    if (!element.id) {
                        this.eventoService.addTaskToEvento(element).subscribe({
                            next: (response: TareasEvento) => {
                                console.log('tareas agregada[]', response);
                                this.closeModal.emit();
                            },
                            error: (error) => {
                                console.error('Error obteniendo las tareas', error);
                            },
                            complete: () => {
                                console.log('Solicitud completada');
                            },
                        });

                        return;
                    }

                    this.eventoService.updateTaskInEvents(element).subscribe({
                        next: (response: TareasEvento) => {
                            this.closeModal.emit();
                            console.log('tarea actualizada[]', response);
                        },
                        error: (error) => {
                            console.error('Error obteniendo las tareas', error);
                        },
                        complete: () => {
                            console.log('Solicitud completada');
                        },
                    });

                    element.subtareas.forEach((subTarea) => {
                        if (!subTarea.id) {
                            this.eventoService.addSubTaskInTask(subTarea, element.id).subscribe({
                                next: (response: Subtarea) => {
                                    this.closeModal.emit();
                                    console.log('sub tarea agregada[]', response);
                                },
                                error: (error) => {
                                    console.error('Error obteniendo las tareas', error);
                                },
                                complete: () => {
                                    console.log('Solicitud completada');
                                },
                            });
                            return;
                        }
                        this.eventoService.updateSubTaskInTask(subTarea).subscribe({
                            next: (response: Subtarea) => {
                                this.closeModal.emit();
                                console.log('sub tarea actualizada[]', response);
                            },
                            error: (error) => {
                                console.error('Error obteniendo las tareas', error);
                            },
                            complete: () => {
                                console.log('Solicitud completada');
                            },
                        });
                    });
                });

                this.createNotification('success', 'Tarea actualizada', 'Tarea guardada exitosamente.');

            }
        });



    }

    onAddTaskAndSubTask(): void {
        const newTask: TareasEvento = {
            id: null, // Asigna un valor apropiado o deja que el backend lo asigne
            titulo: 'Nueva Tarea',
            descripcion: 'Descripción de la nueva tarea',
            idEvento: this.EventoToEdit.id,
            fechaLimite: new Date(), // Fecha límite actual, puedes ajustarla según sea necesario
            idPrioridad: 1,
            etiqueta: {
                id: 0, // Asigna un valor apropiado o deja que el backend lo asigne
                nombre: 'Etiqueta de Ejemplo',
                color: '#000000',
            },
            prioridad: {
                id: null, // Asigna un valor apropiado o deja que el backend lo asigne
                nombre: 'Prioridad de Ejemplo',
                color: '#FF0000',
            },
            subtareas: [
                {
                    id: null, // Asigna un valor apropiado o deja que el backend lo asigne
                    titulo: 'esta tarea fue agregada por el vento de agregar',
                    estado: false,
                },
            ],
            active: true,
            disabled: false,
        };

        this.tareas.push(newTask);
    }

    onAddSubTask(task: TareasEvento): void {
        const newSubtask: Subtarea = {
            id: 0, // Assuming 0 or another value that signifies a new subtask
            titulo: 'New Subtask',
            estado: false,
        };

        task.subtareas.push(newSubtask);
        this.updateTaskEtiqueta(task);
    }

    onDeleteSubTask(tarea: TareasEvento, index: number): void {
        this.eventoService.deleteSubTareaById(tarea.subtareas[index].id).subscribe({
            next: (response: Boolean) => {
                console.log('sub tarea actualizada[]', response);
                tarea.subtareas.splice(index, 1); // Elimina la subtarea en el índice especificado
                this.updateTaskEtiqueta(tarea);
            },
            error: (error) => {
                console.error('Error obteniendo las tareas', error);
            },
            complete: () => {
                console.log('Solicitud completada');
            },
        });
    }

    onClickInCheckBox(tarea: TareasEvento, index: number): void {
        console.log(tarea.subtareas[index].id);

        this.updateTaskEtiqueta(tarea);

        this.eventoService
            .updateEtiquetaOnSubTasks(tarea.subtareas[index].id)
            .subscribe({
                next: (response: Subtarea) => {
                    console.log('SubTarea cambiando etiqueta', response);
                },
                error: (error) => {
                    console.error('Error obteniendo las tareas', error);
                },
                complete: () => {
                    console.log('Solicitud completada');
                },
            });
    }

    updateTaskEtiqueta(tarea: TareasEvento): void {
        // Determinar los estados de las subtareas
        const allTrue = tarea.subtareas.every(
            (subtarea) => subtarea.estado === true
        );
        const allFalse = tarea.subtareas.every(
            (subtarea) => subtarea.estado === false
        );
        const someTrue = tarea.subtareas.some(
            (subtarea) => subtarea.estado === true
        );

        // Asignar el valor de etiqueta.id basado en los estados
        if (allTrue) {
            tarea.etiqueta.id = 3;
        } else if (someTrue) {
            tarea.etiqueta.id = 2;
        } else if (allFalse) {
            tarea.etiqueta.id = 1;
        }
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

    onChangePriority(prioryty: number, tarea: TareasEvento): void {
        tarea.idPrioridad = prioryty;
    }

    createNotification(type: string, title: string, content: string): void {
        this.notification.create(
            type,
            title,
            content
        );
    }

    collapsePanelClass: string =
        'mb-1 font-medium text-dark bg-transparent dark:text-white/[.87] text-15 border-regular border-1 dark:border-white/10 rounded-6 [&>.ant-collapse-content]:border-none [&>.ant-collapse-header]:px-[20px] [&>.ant-collapse-header]:py-[12px] aria-expanded:[&>.ant-collapse-header]:border-b-1 [&>.ant-collapse-header]:border-regular dark:[&>.ant-collapse-header]:border-white/10';
}
