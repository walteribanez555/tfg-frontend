import { inject, Injectable } from '@angular/core';
import { ApiUserService } from 'src/app/server/services/user/api-user.service';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { User } from '../model/user.model';


export interface GetByIdUserUseCase {
  /**
   * Get a user by id
   * @param id User Id
   * @returns User
   */
  execute(id: string): Promise<ResultUseCase<User, string>>;
}

@Injectable({
  providedIn: 'root',
})
export class GetByIdUserService implements GetByIdUserUseCase {
  #apiUserService = inject(ApiUserService);

  async execute(id: string): Promise<ResultUseCase<User, string>> {
    try {
      const user = await this.#apiUserService.getById(id);
      return {
        isSuccess: true,
        value: user,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: 'An error occurred while getting the user',
      };
    }
  }
}
