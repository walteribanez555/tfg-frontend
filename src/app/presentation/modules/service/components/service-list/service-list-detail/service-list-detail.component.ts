import { Component, inject } from '@angular/core';
import { ServiceService } from '../../../services/service.service';
import { Subject, timer } from 'rxjs';
import { User } from 'src/app/domain/user/model/user.model';
import { DialogService } from 'src/app/presentation/shared/services/Dialog.service';
import { StateCallback } from 'src/app/presentation/shared/types/state-callback.types';
import { Service } from 'src/app/domain/service/model/service.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-list-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './service-list-detail.component.html',
})
export class ServiceListDetailComponent {
   #serviceService = inject(ServiceService);
    #dialogService = inject(DialogService);

    service = this.#serviceService.selectedService;

    serviceDetailsForm = this.#serviceService.servicesDetailsForm;

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
          description: 'Usuario creado',
          timer: timer(2000),
        });
      },
    };

    close() {
      this.#serviceService.closeItemDetails();
    }

    onSubmitForm() {
      this.#serviceService.updateServices(this.stateCallback);
    }

    // onUpdateStateUser() {
    //   this.#serviceService.updateUser();
    // }
}
