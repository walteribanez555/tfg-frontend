import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { single } from 'rxjs';
import { DcDirective } from 'src/app/presentation/shared/directives/dc.directive';
import { UserListDetailComponent } from '../components/user-list/user-list-detail/user-list-detail.component';
import { ModalService } from 'src/app/presentation/shared/services/Modal.service';
import { FormTemplateComponent } from 'src/app/presentation/shared/components/form-template/form-template.component';
import { DynamicForm } from 'src/app/presentation/shared/types/dynamic.types';
import { ModalFormComponent } from 'src/app/presentation/shared/components/modal-form/modal-form.component';
import { ActionType } from 'src/app/presentation/shared/enum/action';
import { responseModalFormMapper } from 'src/app/presentation/shared/utils/mappers/response-modal-form/response-modal-form';
import { InputTextComponent } from 'src/app/presentation/shared/components/form-inputs/input-text/input-text.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UserRepositoryService } from 'src/app/domain/user/user-repository.service';
import { CreateUserRequestDto } from 'src/app/server/services/user/models/create-user-request.dto';
import { StateCallback } from 'src/app/presentation/shared/types/state-callback.types';
import { User } from 'src/app/domain/user/model/user.model';
import { PaginationDto } from 'src/app/server/services/shared/dto/pagination.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #modalService = inject(ModalService);
  #userRepository = inject(UserRepositoryService);

  /**Container to show the user-list-detail-component */
  #containerItem: WritableSignal<DcDirective | null> = signal(null);

  /**Is Showing the user details */
  isShowingDetails = signal<boolean>(false);

  /**Is Loading */
  isLoading = signal<boolean>(false);

  /**Selected user */
  selectedUser = signal<User | null>(null);

  /** Users */
  users = signal<User[]>([]);

  /** Limit */
  limit = signal<number>(10);

  /** Offset */
  offset = signal<number>(0);

  /** Total */
  total = signal<number>(0);

  /**User Details Form */
  userDetailsForm = signal<FormGroup | null>(null);

  constructor() {}

  showItemDetails(user: User, dcWrapper: DcDirective) {
    this.selectedUser.set(user);
    this.onCreateFormUserDetails();
    this.#containerItem.set(dcWrapper);

    const viewContainerRef = this.#containerItem()!.viewContainerRef;
    viewContainerRef.clear();
    const componentFactory = viewContainerRef.createComponent(UserListDetailComponent);
  }

  closeItemDetails() {
    this.#containerItem()!.viewContainerRef.clear();
    this.selectedUser.set(null);
    this.isShowingDetails.set(false);
  }

  onCreateUser(stateCallback?: StateCallback<User, string>) {
    const detailForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Crear Usuario',
        description: 'Se necesita la siguiente información para crear un usuario',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            title: 'Nombre Completo',
            id: 'fullName',
            placeholder: 'Nombre Completo',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputTextComponent,
          data: {
            title: 'Correo Electrónico',
            id: 'email',
            placeholder: 'Correo Electrónico',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputTextComponent,
          data: {
            title: 'Contraseña',
            id: 'password',
            placeholder: 'Contraseña',
          },
          fieldFormControl: new FormControl(),
        },
      ],
    };

    this.#modalService
      .open(ModalFormComponent, {
        title: `Crear Usuario`,
        size: 'sm',
        forms: [detailForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Crear',
          },
        ],
      })
      .subscribe(async (result) => {
        const { fullName, email, password } = responseModalFormMapper(result);

        const createUserRequestDto: CreateUserRequestDto = {
          fullName,
          email,
          password,
        };

        this.#createUser(createUserRequestDto, stateCallback);
      });
  }

  onCreateFormUserDetails() {
    if (!this.selectedUser()) {
      return;
    }
    this.userDetailsForm.set(
      new FormGroup({
        fullName: new FormControl(this.selectedUser()?.fullName),
        email: new FormControl(this.selectedUser()?.email),
        isActive: new FormControl(this.selectedUser()?.isActive),
      }),
    );
  }

  onLoadUsers(paginationDto: PaginationDto) {
    this.#loadUsers(paginationDto);
  }

  updateUser(stateCallback? : StateCallback<User, string>) {
    const { fullName, email, isActive } = this.userDetailsForm()?.value;
    const userToUpdate : User = {
      id: this.selectedUser()!.id,
      fullName,
      email,
      isActive,
      roles: this.selectedUser()!.roles,
    }
    this.#userToUpdate(userToUpdate, stateCallback);
  }


  async #createUser(createUserRequestDto: CreateUserRequestDto, stateCallback?: StateCallback<User, string>) {
    if (stateCallback) {
      stateCallback.onLoading();
    }
    this.isLoading.set(true);
    const result = await this.#userRepository.createUserUseCase(createUserRequestDto);
    this.isLoading.set(false);
    if (result.isSuccess) {
      if (stateCallback) {
        stateCallback.onResult(result.value);
      }
    } else {
      if (stateCallback) {
        stateCallback.onError(result.error);
      }
    }
    if (stateCallback) {
      stateCallback.onComplete();
    }
  }

  async #userToUpdate(user: User, stateCallback?:  StateCallback<User, string>) {
    if (stateCallback) {
      stateCallback.onLoading();
    }
    this.isLoading.set(true);
    const result = await this.#userRepository.updateUserUseCase(user);
    this.isLoading.set(false);
    if (result.isSuccess) {
      if (stateCallback) {
        stateCallback.onResult(result.value);
      }
      this.selectedUser.set(result.value);
    }
    else{
      if (stateCallback) {
        stateCallback.onError(result.error);
      }
      console.error('Error updating user');
    }
  }

  async #loadUsers(paginationDto: PaginationDto) {
    this.isLoading.set(true);
    const response = await this.#userRepository.getUsersUseCase(paginationDto);

    if (response.isSuccess) {
      const { total, items, limit, offset } = response.value;
      this.total.set(total);
      this.users.set(items);
      this.limit.set(limit);
      this.offset.set(offset);
    } else {
      console.error('Error loading users');
    }
    this.isLoading.set(false);
  }
}
