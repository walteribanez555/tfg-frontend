import { Component, inject, OnInit, output } from '@angular/core';
import { SpecialtyListHeaderComponent } from '../specialty-list-header/specialty-list-header.component';
import { SpecialtyListTableFooterComponent } from './components/specialty-list-table-footer/specialty-list-table-footer.component';
import { SpecialtyListTableActionComponent } from './components/specialty-list-table-action/specialty-list-table-action.component';
import { SpecialtyFilterService } from '../../../services/specialty-filter.service';
import { SpecialtyService } from '../../../services/specialty.service';
import { Specialty } from 'src/app/domain/specialty/model/specialty.model';
import { SpecialtyListTableRowComponent } from './components/specialty-list-table-row/specialty-list-table-row.component';

@Component({
  selector: 'app-specialty-list-table',
  imports: [SpecialtyListHeaderComponent, SpecialtyListTableFooterComponent, SpecialtyListTableActionComponent, SpecialtyListTableRowComponent],
  templateUrl: './specialty-list-table.component.html',
})
export class SpecialtyListTableComponent implements OnInit {
  ngOnInit(): void {
    this.#specialtyService.onLoadSpecialties({
      limit: this.limit,
      offset: this.offset,
    });
  }

  #specialtyService = inject(SpecialtyService);
  #specialtyFilterService = inject(SpecialtyFilterService);

  onSpecialtySelected= output<Specialty>();

  protected readonly specialties = this.#specialtyService.specialties;
  protected readonly isLoading = this.#specialtyService.isLoading;

  limit = 20;

  offset = 0;

  filteredSpecialties = () => {
    const search = this.#specialtyFilterService.searchField().toLowerCase();

    return this.specialties().filter((specialty) => specialty.name.toLowerCase().includes(search));
  };
}
