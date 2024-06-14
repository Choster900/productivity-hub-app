import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../interfaces/proyecto.interface';

@Component({
    selector: 'app-proyecto',
    templateUrl: './proyecto.component.html',
    styles: ``,
})
export class ProyectoComponent implements OnInit {
    constructor(private proyectoService: ProyectoService) { }

    public isLoading = true;
    public showContent = false;
    public isOpenModal: Boolean = false;
    public proyectos: Proyecto[] = [];
    public proyectoToSendModal: Proyecto;

    ngOnInit(): void {
        this.gettingProyectos();
        this.loadData();
    }

    gettingProyectos() {
        this.proyectoService.getProyectos().subscribe({
            next: (response: Proyecto[]) => {
                // Manejar la respuesta
                this.proyectos = response;
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

    handleDataProyecto(proyecto: Proyecto): void {
        this.proyectoToSendModal = proyecto;
    }
    loadData() {
        // Simulate an asynchronous data loading operation
        setTimeout(() => {
            this.isLoading = false;
            this.showContent = true;
        }, 500);
    }
}
