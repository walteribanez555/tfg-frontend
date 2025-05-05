import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TfgService } from '../../../services/tfg.service';

@Component({
  selector: 'app-tfg-student-detail-header',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tfg-student-detail-header.component.html',
})
export class TfgStudentDetailHeaderComponent {
  #tfgService = inject(TfgService);

  listTfg = [];

  studentId = '';

  getTfgByStudent() {
    this.#tfgService.getTfgByUserId(this.studentId)
  }
}
