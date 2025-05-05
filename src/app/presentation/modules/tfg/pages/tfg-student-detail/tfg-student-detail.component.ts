import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TfgStudentDetailHeaderComponent } from "../../components/tfg-student-detail/tfg-student-detail-header/tfg-student-detail-header.component";
import { TfgStudentDetailListComponent } from "../../components/tfg-student-detail/tfg-student-detail-list/tfg-student-detail-list.component";
import { TfgService } from '../../services/tfg.service';

@Component({
  selector: 'app-tfg-student-detail',
  imports: [TfgStudentDetailHeaderComponent, TfgStudentDetailListComponent],
  templateUrl : './tfg-student-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TfgStudentDetailComponent {

  #tfgService = inject(TfgService);


  onShowItem = this.#tfgService.isShowingDetails;



}
