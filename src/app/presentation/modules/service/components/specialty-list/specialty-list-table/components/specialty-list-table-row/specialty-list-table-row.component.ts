import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Specialty } from 'src/app/domain/specialty/model/specialty.model';

@Component({
  selector: '[app-specialty-list-table-row]',
  imports: [],
  templateUrl : './specialty-list-table-row.component.html',
})
export class SpecialtyListTableRowComponent {
  specialty = input.required<Specialty>();
 }
