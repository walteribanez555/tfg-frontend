import { inject, Injectable } from '@angular/core';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { PaginationDto } from 'src/app/server/services/shared/dto/pagination.dto';
import { Service } from '../model/service.model';
import { PaginationResponseDto } from 'src/app/server/services/shared/dto/pagination-response.dto';
import { ApiServiceService } from 'src/app/server/services/service/api-service.service';

export interface GetServicesUseCase {
  execute(paginationDto : PaginationDto): Promise<ResultUseCase<PaginationResponseDto<Service>, string>>;
}

@Injectable({
  providedIn: 'root',
})
export class GetServicesService implements GetServicesUseCase {
  #apiService = inject(ApiServiceService);

  async execute(paginationDto: PaginationDto): Promise<ResultUseCase<PaginationResponseDto<Service>, string>> {
    try {
      const services = await this.#apiService.getServices(paginationDto);
      return {
        isSuccess: true,
        value: services,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        error: error.error.message,
      };
    }
  }
}
