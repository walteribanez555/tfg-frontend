import { Component, computed, inject, OnInit, output } from '@angular/core';
import { ServiceListHeaderComponent } from '../service-list-header/service-list-header.component';
import { ServiceListTableFooterComponent } from './components/service-list-table-footer/service-list-table-footer.component';
import { ServiceListTableActionComponent } from './components/service-list-table-action/service-list-table-action.component';
import { ServiceService } from '../../../services/service.service';
import { ServiceFilterService } from '../../../services/service-filter.service';
import { Service } from 'src/app/domain/service/model/service.model';
import { ServiceListTableRowComponent } from './components/service-list-table-row/service-list-table-row.component';

@Component({
  selector: 'app-service-list-table',
  imports: [
    ServiceListHeaderComponent,
    ServiceListTableFooterComponent,
    ServiceListTableActionComponent,
    ServiceListTableRowComponent,
  ],
  templateUrl: './service-list-table.component.html',
})
export class ServiceListTableComponent implements OnInit {
  ngOnInit(): void {
    this.#serviceService.onLoadServices({
      limit: this.limit,
      offset: this.offset,
    });
  }

  #serviceService = inject(ServiceService);
  #serviceFilterService = inject(ServiceFilterService);

  onServiceSelected = output<Service>();

  protected readonly services = this.#serviceService.services;
  protected readonly isLoading = this.#serviceService.isLoading;

  limit = 20;

  offset = 0;

  filteredServices = computed(() => {
    const search = this.#serviceFilterService.searchField().toLowerCase();

    return this.services().filter(
      (service) => service.name.toLowerCase().includes(search) || service.description.toLowerCase().includes(search),
    );
  });
}
