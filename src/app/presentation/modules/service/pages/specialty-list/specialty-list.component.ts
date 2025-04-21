import { Component, inject, viewChild } from '@angular/core';
import { User } from 'src/app/domain/user/model/user.model';
import { DcDirective } from 'src/app/presentation/shared/directives/dc.directive';
import { SpecialtyListTableComponent } from "../../components/specialty-list/specialty-list-table/specialty-list-table.component";
import { SpecialtyService } from '../../services/specialty.service';
import { Specialty } from 'src/app/domain/specialty/model/specialty.model';

@Component({
  selector: 'app-specialty-list',
  imports: [SpecialtyListTableComponent, DcDirective],
  templateUrl: './specialty-list.component.html',
})
export class SpecialtyListComponent {
    #specialtyService = inject(SpecialtyService);

    dcWrapper = viewChild.required('dcWrapper', { read: DcDirective });
    onShowItem = this.#specialtyService.isShowingDetails;

    onItemSelected(specialty: Specialty) {
      this.#specialtyService.showItemDetails(specialty, this.dcWrapper());
    }
 }
