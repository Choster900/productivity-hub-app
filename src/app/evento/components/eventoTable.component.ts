import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Evento } from 'src/app/evento/interfaces/evento';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'nz-eventoTable',
  template: `
    <div
      class="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative "
    >
      <div
        class="px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]"
      >
        <h1
          class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-white/[.87]"
        >
          Todos los eventos
        </h1>
      </div>
      <div class="px-[25px] pt-0 pb-[25px]">
        <div
          *ngFor="let tab of tabData"
          [class.hidden]="sellingTab !== tab.key"
        >
          <div class="overflow-x-auto w-full">
            <nz-table
              [nzData]="dataEventos"
              [nzFrontPagination]="false"
              [nzShowPagination]="false"
              class="text-sm rounded- [5px]"
            >
              <thead>
                <tr>
                  <th
                    class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-start text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden rounded-s-[4px]"
                  >
                    Titulo
                  </th>
                  <th
                    class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden"
                  >
                    Descripcion
                  </th>
                  <th
                    class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden"
                  >
                    Fecha de inicio
                  </th>
                  <th
                    class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden"
                  >
                    Fecha limite
                  </th>
                  <th
                    class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden"
                  >
                    Tipo
                  </th>
                  <th
                    class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-light dark:text-white/[.87] text-[12px] font-medium border-none before:hidden"
                  >

                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-[#1b1d2a]">
                <tr *ngFor="let event of dataEventos" class="group">
                  <td
                    class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-white/[.87] group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]"
                  >
                    {{ event.titulo }}
                  </td>
                  <td
                    class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                  >
                    {{ event.descripcion }}
                  </td>
                  <td
                    class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                  >
                    {{ event.fechaInicio }}
                  </td>
                  <td
                    class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                  >
                    {{ event.fechaFin }}
                  </td>
                  <td
                    class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                  >
                    {{ event.tipoEvento.nombre }}
                  </td>
                  <td
                    class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent rounded-e-[4px] flex justify-center items-center space-x-4"
                  >
                    <div class="items-center">
                      <svg (click)="deleteEventoById(event.id)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5 text-red-700 dark:text-white cursor-pointer"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        (click)="openModal.emit(); dataEvent.emit(event)"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5 text-gray-700 dark:text-white cursor-pointer"
                      >
                        <path
                          d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z"
                        />
                        <path
                          d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z"
                        />
                      </svg>
                      <svg (click)="openModalTareas.emit(); dataEvent.emit(event)"
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 text-gray-700 dark:text-white cursor-pointer">
                        <path d="M5.127 3.502 5.25 3.5h9.5c.041 0 .082 0 .123.002A2.251 2.251 0 0 0 12.75 2h-5.5a2.25 2.25 0 0 0-2.123 1.502ZM1 10.25A2.25 2.25 0 0 1 3.25 8h13.5A2.25 2.25 0 0 1 19 10.25v5.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75v-5.5ZM3.25 6.5c-.04 0-.082 0-.123.002A2.25 2.25 0 0 1 5.25 5h9.5c.98 0 1.814.627 2.123 1.502a3.819 3.819 0 0 0-.123-.002H3.25Z" />
                      </svg>

                    </div>
                  </td>
                </tr>
              </tbody>
            </nz-table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EventoTableComponent {
  @Input()
  public dataEventos: Evento;
  @Output() openModal = new EventEmitter<void>();
  @Output() dataEvent = new EventEmitter<Evento>();


  @Output() openModalTareas = new EventEmitter<void>();
  @Output() reloadTable = new EventEmitter<void>();

  //Table Data
  seller: any;
  tabData: { key: string; label: string }[];
 
  constructor(private eventoService: EventosService) {
    this.tabData = [
      { key: 'today', label: 'Today' },
      { key: 'week', label: 'Week' },
      { key: 'month', label: 'Month' },
    ];
  }


  deleteEventoById(id: number): void {

    this.eventoService.deleteEventoById(id).subscribe({
      next: (response) => {
        console.log('Evento eliminado con éxito', response);
        this.reloadTable.emit();
      },
      error: (error) => {
        console.error('Error añadiendo el evento', error);
      },
      complete: () => {
        console.log('Solicitud completada');
      },
    });

  }

  //Dropdown Data
  // appItems = items.appItems;
  //Tab
  sellingTab: string = 'today';
  handleClick(tab: string): void {
    this.sellingTab = tab;
  }
}
