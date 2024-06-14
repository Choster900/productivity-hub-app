import { Component, Input, Output } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto.interface';

@Component({
  selector: 'datatable-component',
  templateUrl: './datatable.component.html',
  styles: [],
})
export class DatatableComponent {
  @Input() public Proyectos: Proyecto[];




  //Table Data
  seller: any;
  tabData: { key: string; label: string }[];

  constructor() {
    this.tabData = [
      { key: 'today', label: 'Today' },
      { key: 'week', label: 'Week' },
      { key: 'month', label: 'Month' },
    ];
  }

  //Dropdown Data
  // appItems = items.appItems;
  //Tab
  sellingTab: string = 'today';
  handleClick(tab: string): void {
    this.sellingTab = tab;
  }

}
