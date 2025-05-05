import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TfgService } from '../../../services/tfg.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tfg-student-detail-list',
  imports: [NgClass],
  templateUrl : './tfg-student-detail-list.component.html',
})
export class TfgStudentDetailListComponent {

  #tfgService = inject(TfgService);

  listTfgStudent = this.#tfgService.listTfg;
 }
