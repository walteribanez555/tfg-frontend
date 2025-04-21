import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailListener } from 'src/app/presentation/shared/interfaces/Detail.listener';
import { UserService } from '../../../services/user.service';
import { SelectComponent } from '../../../../../shared/components/custom-inputs/select/select.component';
import { DialogService } from 'src/app/presentation/shared/services/Dialog.service';
import { Subject, timer } from 'rxjs';
import { User } from 'src/app/domain/user/model/user.model';
import { StateCallback } from 'src/app/presentation/shared/types/state-callback.types';

@Component({
  selector: 'app-user-list-detail',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: 'user-list-detail.component.html',
})
export class UserListDetailComponent {
  #userService = inject(UserService);
  #dialogService = inject(DialogService);

  user = this.#userService.selectedUser;

  userDetailsForm = this.#userService.userDetailsForm;

  notifierDialog: Subject<any> = new Subject();

  stateCallback: StateCallback<User, string> = {
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
    this.#userService.closeItemDetails();
  }

  onSubmitForm() {
    this.#userService.updateUser(this.stateCallback);
  }

  onUpdateStateUser() {
    this.userDetailsForm()
      ?.get('isActive')
      ?.setValue(this.user()?.isActive == 1 ? 2 : 1);
    this.#userService.updateUser();
  }
}
