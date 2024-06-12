import { Component } from '@angular/core';
import { Evento } from '../interfaces/evento';
import eventosDataTest from '../../../assets/data/pages/eventosDataTest.json';
import { EventosService } from '../services/eventos.service';

@Component({
  templateUrl: './evento.component.html',
  styles: ``,
})
export class EventoComponent {
  isLoading = true;
  showContent = false;

  public eventos: Evento[] = [];
  public eventoToSendModal: Evento;

  public openModal: Boolean = false;
  public openModalTareas: Boolean = false;

  constructor(private eventosService: EventosService) {
    /*  this.eventos = eventosDataTest */
  }
  ngOnInit() {
    // Simulate loading time
    this.getttingEvents();
    this.loadData();
  }

  handleDataEvent(eventos: Evento): void {
    this.eventoToSendModal = eventos;
  }

  getttingEvents() {
    this.eventosService.getEventos().subscribe({
      next: (response) => {
        // Manejar la respuesta
        console.log('Eventos[]', response);
        this.eventos = response;
        this.openModal = false;
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

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
