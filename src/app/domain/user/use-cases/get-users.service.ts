import { inject, Injectable } from '@angular/core';
import { PaginationDto } from 'src/app/server/services/shared/dto/pagination.dto';
import { ApiUserService } from 'src/app/server/services/user/api-user.service';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { PaginationResponseDto } from 'src/app/server/services/shared/dto/pagination-response.dto';
import { User } from '../model/user.model';

export interface GetUsersUseCase {
  /**
   * Get a list of users
   * @param paginationDto Pagination data
   * @returns List of users
   */
  execute(paginationDto: PaginationDto): Promise<ResultUseCase<PaginationResponseDto<User>, string>>;
}

@Injectable({
  providedIn: 'root',
})
export class GetUsersService implements GetUsersService {
  #apiUserService = inject(ApiUserService);

  async execute(paginationDto: PaginationDto): Promise<ResultUseCase<PaginationResponseDto<User>, string>> {
    try {
      const result = await this.#apiUserService.get(paginationDto);
      return {
        isSuccess: true,
        value: result,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error: 'An error occurred while getting the users',
      };
    }
  }
}
