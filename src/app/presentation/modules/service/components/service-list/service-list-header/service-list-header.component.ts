import { Component, inject, signal } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { User } from 'src/app/domain/user/model/user.model';
import { DialogService } from 'src/app/presentation/shared/services/Dialog.service';
import { StateCallback } from 'src/app/presentation/shared/types/state-callback.types';
import { ServiceService } from '../../../services/service.service';
import { Service } from 'src/app/domain/service/model/service.model';

@Component({
  selector: 'app-service-list-header',
  imports: [],
  templateUrl: './service-list-header.component.html',
})
export class ServiceListHeaderComponent {
  #serviceService = inject(ServiceService);
  #dialogService = inject(DialogService);

  protected readonly total = this.#serviceService.total;

  notifierDialog: Subject<any> = new Subject();

  stateCallback: StateCallback<Service, string> = {
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
      });
    },
    onResult: () => {
      this.notifierDialog.next(0);
      this.#dialogService.ShowSuccess({
        description: 'Servicio creado',
        timer: timer(2000),
      });
    },
  };

  onAddToggle() {
    this.#serviceService.onCreateService(this.stateCallback);
  }
}
