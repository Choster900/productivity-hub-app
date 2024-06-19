import { Component, EventEmitter, Input, Output, SimpleChanges, type OnInit } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { ProyectoService } from '../../services/proyecto.service';
import { Subtarea, TareasProyecto } from '../../interfaces/tarea-proyecto.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'modal-tareas-proyecto-component',
    templateUrl: './modal-tareas-proyecto.component.html',
    styles: [`
    :host {
      display: block;
    }
  `],
})
export class ModalTareasProyectoComponent implements OnInit {

    @Output() closeModal = new EventEmitter<void>();
    @Input() wasOpenModalTareas: Boolean;
    @Input() proyectoToEdit: Proyecto;


    public tareas: TareasProyecto[];

    constructor(
        private proyectoService: ProyectoService,
        private modal: NzModalService,
        private notification: NzNotificationService,
    ) { }

    ngOnInit(): void {
        // this.getTareasByEventoId(1)
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['proyectoToEdit'] && this.proyectoToEdit) {
            const eventoId = this.proyectoToEdit.id;
            if (eventoId) {
                this.getTareasByEventoId(eventoId);
            }
        }
    }

    getTareasByEventoId(eventoId: number): void {
        this.proyectoService.getTareasByProyecto(eventoId).subscribe({
            next: (response: TareasProyecto[]) => {
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

    /*  onSubmit(): void {
         this.tareas.forEach((element) => {
             if (!element.id) {
                 this.proyectoService.addTaskToEvento(element).subscribe({
                     next: (response: TareasProyecto) => {
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

             this.proyectoService.updateTaskInEvents(element).subscribe({
                 next: (response: TareasProyecto) => {
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
                     this.proyectoService.addSubTaskInTask(subTarea, element.id).subscribe({
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
                 this.proyectoService.updateSubTaskInTask(subTarea).subscribe({
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
     } */

    confirmModal?: NzModalRef;

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

    onSubmit(): void {
        this.confirmModal = this.modal.confirm({
            nzTitle: '¿Desea guardar los cambios?',
            nzContent: 'Los cambios se guardarán y se reflejarán de inmediato.',
            nzOnOk: async () => {
                await this.waitForTimeout(2000); // Espera a que el timeout termine

                // Manejando cada tarea
                this.tareas.forEach((element) => {
                    if (!element.id) {
                        // Agregar nueva tarea
                        this.proyectoService.addTaskToEvento(element).subscribe({
                            next: (response: TareasProyecto) => {
                                console.log('Tarea agregada', response);
                                this.closeModal.emit();
                            },
                            error: (error) => {
                                /*  const errorMessage = this.getErrorMessage(error);
                                 this.createNotification('error', 'Error', errorMessage); */
                                console.log('Tarea agregada', error);

                            },
                            complete: () => {
                                console.log('Solicitud completada');
                            },
                        });
                    } else {
                        // Actualizar tarea existente
                        this.proyectoService.updateTaskInEvents(element).subscribe({
                            next: (response: TareasProyecto) => {
                                console.log('Tarea actualizada', response);
                                this.closeModal.emit();
                            },
                            error: (error) => {
                                /*  const errorMessage = this.getErrorMessage(error);
                                 this.createNotification('error', 'Error', errorMessage); */
                                console.log('Tarea agregada', error);

                            },
                            complete: () => {
                                console.log('Solicitud completada');
                            },
                        });
                    }

                    // Manejando subtareas de la tarea
                    element.subtareas.forEach((subTarea) => {
                        if (!subTarea.id) {
                            // Agregar nueva subtarea
                            this.proyectoService.addSubTaskInTask(subTarea, element.id).subscribe({
                                next: (response: Subtarea) => {
                                    console.log('Subtarea agregada', response);
                                    this.closeModal.emit();
                                },
                                error: (error) => {
                                    /*  const errorMessage = this.getErrorMessage(error);
                                     this.createNotification('error', 'Error', errorMessage); */
                                    console.log('Tarea agregada', error);

                                },
                                complete: () => {
                                    console.log('Solicitud completada');
                                },
                            });
                        } else {
                            // Actualizar subtarea existente
                            this.proyectoService.updateSubTaskInTask(subTarea).subscribe({
                                next: (response: Subtarea) => {
                                    console.log('Subtarea actualizada', response);
                                    this.closeModal.emit();
                                },
                                error: (error) => {
                                    /*   const errorMessage = this.getErrorMessage(error);
                                      this.createNotification('error', 'Error', errorMessage); */
                                    console.log('Tarea agregada', error);

                                },
                                complete: () => {
                                    console.log('Solicitud completada');
                                },
                            });
                        }
                    });
                });


                this.createNotification('success', 'Tarea actualizada', 'Tarea guardada exitosamente.');

            }
        });
    }

    onAddTaskAndSubTask(): void {
        const newTask: TareasProyecto = {
            id: null, // Asigna un valor apropiado o deja que el backend lo asigne
            titulo: 'Nueva Tarea',
            descripcion: 'Descripción de la nueva tarea',
            idProyecto: this.proyectoToEdit.id,
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

    onAddSubTask(task: TareasProyecto): void {
        const newSubtask: Subtarea = {
            id: 0,
            titulo: 'New Subtask',
            estado: false,
        };

        task.subtareas.push(newSubtask);
        this.updateTaskEtiqueta(task);
    }

    onDeleteSubTask(tarea: TareasProyecto, index: number): void {
        this.proyectoService.deleteSubTareaById(tarea.subtareas[index].id).subscribe({
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

    onClickInCheckBox(tarea: TareasProyecto, index: number): void {
        console.log(tarea.subtareas[index].id);

        this.updateTaskEtiqueta(tarea);

        this.proyectoService
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

    updateTaskEtiqueta(tarea: TareasProyecto): void {
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
        this.wasOpenModalTareas = false;
        this.proyectoToEdit = null;
        this.closeModal.emit();
    }

    handleCancel(): void {
        this.wasOpenModalTareas = false;
        this.proyectoToEdit = null;
        this.closeModal.emit();
    }

    onChangePriority(prioryty: number, tarea: TareasProyecto): void {
        tarea.idPrioridad = prioryty;
    }


    private waitForTimeout(timeout: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, timeout);
        });
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
