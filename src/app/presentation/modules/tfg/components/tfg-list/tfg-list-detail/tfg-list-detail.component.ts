import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { DetailListener } from 'src/app/presentation/shared/interfaces/Detail.listener';
import { Tfg } from '../../../models/tfg.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectComponent } from 'src/app/presentation/shared/components/custom-inputs/select/select.component';
import { ModeService } from '../../../services/mode.service';
import { ScolarshipService } from '../../../services/scolarship.service';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';
import { Scolarship } from '../../../models/tutor.model';
import { Mode } from '../../../models/mode.model';
import { ItemList } from 'src/app/presentation/shared/components/item-list/interfaces/ItemList.interfaces';
import { StateTfgService } from '../../../services/state-tfg.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-tfg-list-detail',
  imports: [CommonModule, SelectComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './tfg-list-detail.component.html',
})
export class TfgListDetailComponent implements OnInit {
  #studentService = inject(StudentService);
  #scolarshipService = inject(ScolarshipService);
  #stateTfgService = inject(StateTfgService);
  #modeService = inject(ModeService);

  students: ItemList[] = this.#studentService.getStudents().map((student, index) => {
    return {
      id: index,
      name: student.name,
    };
  });
  tutors: ItemList[] = this.#scolarshipService.getScolarship().map((tutor, index) => {
    return {
      id: index,
      name: tutor.name,
    };
  });
  modes: ItemList[] = this.#modeService.getModes().map((mode, index) => {
    return {
      id: index,
      name: mode.name,
    };
  });
  states: ItemList[] = this.#stateTfgService.getStates().map((state, index) => {
    return {
      id: index,
      name: state.name,
    };
  });

  ngOnInit(): void {
    console.log(this.tfg);
    this.tfgForm = new FormGroup({
      tfg_id: new FormControl(this.tfg.tfg_id),
      title: new FormControl(this.tfg.title),
      date: new FormControl(this.tfg.date),
      state: new FormControl(this.tfg.state),
      student_id: new FormControl(this.students.findIndex((student) => student.name === this.tfg.student_name)),
      tutor_id: new FormControl(this.tutors.findIndex((tutor) => tutor.name === this.tfg.tutor_name)),
      mode_id: new FormControl(this.modes.findIndex((mode) => mode.name === this.tfg.mode_name)),
      state_id: new FormControl(this.states.findIndex((state) => state.name === this.tfg.state)),
    });
  }

  @Input() detailListener!: DetailListener<Tfg>;
  @Input() tfg!: Tfg;

  tfgForm = new FormGroup({
    tfg_id: new FormControl(),
    title: new FormControl(),
    date: new FormControl(),
    state: new FormControl(),
    student_id: new FormControl(),
    tutor_id: new FormControl(),
    mode_id: new FormControl(),
    state_id: new FormControl(),
  });

  close() {
    this.detailListener.close();
  }

  onSubmit() {
    this.detailListener.submit(this.tfgForm);
  }

  onDelete() {
    this.detailListener.delete(this.tfg.tfg_id);
  }
}
