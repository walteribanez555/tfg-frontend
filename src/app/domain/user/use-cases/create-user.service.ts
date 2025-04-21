import { inject, Injectable } from '@angular/core';
import { ApiUserService } from 'src/app/server/services/user/api-user.service';
import { CreateUserRequestDto } from 'src/app/server/services/user/models/create-user-request.dto';
import { User } from '../model/user.model';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { HttpErrorResponse } from '@angular/common/http';

export interface CreateUserUseCase {
  /**
   * Create a new User
   * @param createUserRequestDto User data to create
   * @returns User
   */
  execute(createUserRequestDto: CreateUserRequestDto): Promise<ResultUseCase<User, string>>;
}

@Injectable({
  providedIn: 'root',
})
export class CreateUserService implements CreateUserUseCase {
  #apiUserService = inject(ApiUserService);

  async execute(createUserRequestDto: CreateUserRequestDto): Promise<ResultUseCase<User, string>> {
    try {
      const user = await this.#apiUserService.create(createUserRequestDto);
      return {
        isSuccess: true,
        value: user,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        error: error.error.message,
      };
    }
  }
}
