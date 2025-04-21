import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Service } from 'src/app/domain/service/model/service.model';

@Component({
  selector: '[app-service-list-table-row]',
  imports: [],
  templateUrl: './service-list-table-row.component.html',
})
export class ServiceListTableRowComponent {
  service = input.required<Service>();
}
