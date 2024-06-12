import { Component } from '@angular/core';

@Component({
  selector: 'nz-dropdown-prioridades',
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu">
      <i nz-icon nzType="down"></i>
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul class="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4 capitalize" nzSelectable>
        <li class="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm dark:hover:text-white/[.87]" >PENDIENTE</li>
        <li class="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm dark:hover:text-white/[.87]" >EN PROGRESO</li>
        <li class="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm dark:hover:text-white/[.87]" >COMPLETA</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzDropdownPrioridadesComponent {}
