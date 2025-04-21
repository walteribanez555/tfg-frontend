import { inject, Injectable } from '@angular/core';
import { CreateServiceRequestDto } from 'src/app/server/services/service/models/create-service-request.dto';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Service } from '../model/service.model';
import { ApiServiceService } from 'src/app/server/services/service/api-service.service';

export interface CreateServiceUseCase {
  execute( createServiceRequestDto : CreateServiceRequestDto) : Promise<ResultUseCase<Service, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class CreateServiceService implements CreateServiceUseCase {
  #apiService = inject(ApiServiceService);

  async execute(createServiceRequestDto: CreateServiceRequestDto): Promise<ResultUseCase<Service, string>> {
    try {
      const service = await this.#apiService.createService(createServiceRequestDto);
      return {
        isSuccess: true,
        value: service,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        error: error.error.message,
      };
    }
  }
}
