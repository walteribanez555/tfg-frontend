import { Component, inject, OnInit, output } from '@angular/core';
import { TfgService } from '../../../services/tfg.service';
import { DatePipe, NgClass } from '@angular/common';
import { Tfg } from '../../../models/tfg.model';

@Component({
  selector: 'app-tfg-list-table',
  imports: [NgClass, DatePipe],
  templateUrl: './tfg-list-table.component.html',
})
export class TfgListTableComponent implements OnInit {

  onSelectItem = output<Tfg>();

  ngOnInit(): void {
    this.#tfgService.getAllTfgs();
  }

  #tfgService = inject(TfgService);

  tfgList = this.#tfgService.listAllTfg;


 }
