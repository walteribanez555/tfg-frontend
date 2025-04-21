import { inject, Injectable } from '@angular/core';
import { ApiUserService } from 'src/app/server/services/user/api-user.service';
import { User } from '../model/user.model';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { UpdateUserRequestDto } from 'src/app/server/services/user/models/update-user-request.dto';

export interface UpdateUserUseCase {
  /**
   * Update a User
   * @param user User data to update
   * @returns User
   */
  execute(user: User): Promise<ResultUseCase<User, string>>;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateUserService implements UpdateUserUseCase {
  #apiUserService = inject(ApiUserService);

  async execute(user: User): Promise<ResultUseCase<User, string>> {
    try {
      const updateUserRequestDto : UpdateUserRequestDto = {
        is_active: user.isActive,
        fullName: user.fullName,
      }

      const updatedUser = await this.#apiUserService.update(user.id, updateUserRequestDto);
      return {
        isSuccess: true,
        value: updatedUser,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: 'An error occurred while updating the user',
      };
    }
  }
}
