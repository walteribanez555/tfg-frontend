import { Component, inject, viewChild } from '@angular/core';
import { User } from 'src/app/domain/user/model/user.model';
import { DcDirective } from 'src/app/presentation/shared/directives/dc.directive';
import { ServiceListTableComponent } from "../../components/service-list/service-list-table/service-list-table.component";
import { ServiceService } from '../../services/service.service';
import { Service } from 'src/app/domain/service/model/service.model';

@Component({
  selector: 'app-service-list',
  imports: [ServiceListTableComponent, DcDirective],
  templateUrl: './service-list.component.html',
})
export class ServiceListComponent {
  #serviceService = inject(ServiceService);

  dcWrapper = viewChild.required('dcWrapper', { read: DcDirective });
  onShowItem = this.#serviceService.isShowingDetails;

  onItemSelected(service: Service) {
    this.#serviceService.showItemDetails(service, this.dcWrapper());
  }
}
