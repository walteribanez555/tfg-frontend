import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DialogService } from 'src/app/presentation/shared/services/Dialog.service';
import { Subject, timer } from 'rxjs';
import { StateCallback } from 'src/app/presentation/shared/types/state-callback.types';
import { User } from 'src/app/domain/user/model/user.model';

@Component({
  selector: 'app-user-list-header',
  imports: [],
  templateUrl: 'user-list-header.component.html',
})
export class UserListHeaderComponent {
  #userService = inject(UserService);
  #dialogService = inject(DialogService);

  protected readonly total = this.#userService.total;

  notifierDialog: Subject<any> = new Subject();

  stateCallback : StateCallback<User,string> = {
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
        description: 'Usuario creado',
        timer: timer(2000),
      });
    },
  };

  onAddToggle() {
    this.#userService.onCreateUser(this.stateCallback);
  }
}
