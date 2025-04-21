import { Component, inject, signal } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { DialogService } from 'src/app/presentation/shared/services/Dialog.service';
import { StateCallback } from 'src/app/presentation/shared/types/state-callback.types';
import { SpecialtyService } from '../../../services/specialty.service';
import { Specialty } from 'src/app/domain/specialty/model/specialty.model';

@Component({
  selector: 'app-specialty-list-header',
  imports: [],
  templateUrl: './specialty-list-header.component.html',
})
export class SpecialtyListHeaderComponent {
 #specialtyService = inject(SpecialtyService);
  #dialogService = inject(DialogService);

  protected readonly total = this.#specialtyService.total;

  notifierDialog: Subject<any> = new Subject();

  stateCallback : StateCallback<Specialty,string> = {
    onComplete: () => {},
    onError: (e) => {
      this.notifierDialog.next(0);
      this.#dialogService.showError({
        description: e,
        timer: timer(2000),
      });
    },
    onLoading: () => {
      console.log('loading');
      this.#dialogService.showLoading({
        description: 'Cargando',
        listener: this.notifierDialog,
      })
    },
    onResult: () => {
      this.notifierDialog.next(0);
      this.#dialogService.ShowSuccess({
        description: 'Especialidad',
        timer: timer(2000),
      });
    },
  };

  onAddToggle() {
    this.#specialtyService.onCreateSpecialty(this.stateCallback);
  }
 }
