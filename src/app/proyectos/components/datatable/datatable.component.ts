import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
    selector: 'datatable-component',
    templateUrl: './datatable.component.html',
    styles: [],
})
export class DatatableComponent {
    @Input() public Proyectos: Proyecto[];

    @Output() openModal = new EventEmitter<void>();
    @Output() proyectoWasSelected = new EventEmitter<Proyecto>();
    @Output() openModalTareas = new EventEmitter<Proyecto>();
    @Output() reloadTable = new EventEmitter<void>();

    //Table Data
    seller: any;
    tabData: { key: string; label: string }[];

    constructor(private proyectoService: ProyectoService) {
        this.tabData = [
            { key: 'today', label: 'Today' },
            { key: 'week', label: 'Week' },
            { key: 'month', label: 'Month' },
        ];
    }


    deleteProyectoById(id: number): void {

        this.proyectoService.deleteProyectoById(id).subscribe({
            next: (response) => {
                console.log('Proyecto añadido con éxito', response);
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
