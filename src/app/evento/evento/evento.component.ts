import { Component } from '@angular/core';
import { Evento } from '../interfaces/evento';
import eventosDataTest  from '../../../assets/data/pages/eventosDataTest.json';

@Component({
  templateUrl: './evento.component.html',
  styles: ``
})
export class EventoComponent {
  isLoading = true;
  showContent = false;
  public eventos: any


  constructor(){
    this.eventos = eventosDataTest
  }
  ngOnInit() {
    // Simulate loading time
    this.loadData();
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
