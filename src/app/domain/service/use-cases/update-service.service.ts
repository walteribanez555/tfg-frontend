import { inject, Injectable } from '@angular/core';
import { UpdateServiceRequestDto } from 'src/app/server/services/service/models/update-service-request.dto';
import { Service } from '../model/service.model';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { ApiServiceService } from 'src/app/server/services/service/api-service.service';

export interface UpdateServiceUseCase {
  execute(serviceId: string, updateServiceRequest: UpdateServiceRequestDto): Promise<ResultUseCase<Service, string>>;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateServiceService implements UpdateServiceUseCase {
  #apiService = inject(ApiServiceService);

  async execute(id: string, updateServiceRequestDto: UpdateServiceRequestDto): Promise<ResultUseCase<Service, string>> {
    try {
      const service = await this.#apiService.updateService(id, updateServiceRequestDto);
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
