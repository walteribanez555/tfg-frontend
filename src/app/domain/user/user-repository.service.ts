import { inject, Injectable } from '@angular/core';
import { CreateUserService } from './use-cases/create-user.service';
import { UpdateUserService } from './use-cases/update-user.service';
import { GetUsersService } from './use-cases/get-users.service';
import { GetByIdUserService } from './use-cases/get-by-id-user.service';
import { CreateUserRequestDto } from 'src/app/server/services/user/models/create-user-request.dto';
import { User } from './model/user.model';
import { PaginationDto } from 'src/app/server/services/shared/dto/pagination.dto';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  #createUserUseCaseService = inject(CreateUserService);
  #updateUserUseCaseService = inject(UpdateUserService);
  #getUsersUseCaseService = inject(GetUsersService);
  #getByIdUseCaseService = inject(GetByIdUserService);

  /**
   * Create a new User
   * @param createUserRequestDto User data to create
   * @returns User
   */
  createUserUseCase(createUserRequestDto: CreateUserRequestDto) {
    return this.#createUserUseCaseService.execute(createUserRequestDto);
  }

  /**
   * Update a User
   * @param user User data to update
   * @returns User
   */
  updateUserUseCase(user: User) {
    return this.#updateUserUseCaseService.execute(user);
  }

  /**
   * Get a list of users
   * @param paginationDto Pagination data
   * @returns List of users
   */
  getUsersUseCase(paginationDto: PaginationDto) {
    return this.#getUsersUseCaseService.execute(paginationDto);
  }

  /**
   * Get a user By Id
   * @param id User Id
   * @returns User
   */
  getByIdUseCase(id: string) {
    return this.#getByIdUseCaseService.execute(id);
  }
}
