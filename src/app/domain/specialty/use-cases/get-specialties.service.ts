import { inject, Injectable } from '@angular/core';
import { PaginationResponseDto } from 'src/app/server/services/shared/dto/pagination-response.dto';
import { PaginationDto } from 'src/app/server/services/shared/dto/pagination.dto';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Specialty } from '../model/specialty.model';
import { ApiSpecialtyService } from 'src/app/server/services/specialty/api-specialty.service';

export interface GetSpecialtiesService {
  execute(paginationDto : PaginationDto) : Promise<ResultUseCase<PaginationResponseDto<Specialty>, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class GetSpecialtiesService implements GetSpecialtiesService {
  private apiService = inject(ApiSpecialtyService);

  async execute(paginationDto: PaginationDto): Promise<ResultUseCase<PaginationResponseDto<Specialty>, string>> {
    try {
      const specialties = await this.apiService.getSpecialties(paginationDto);
      return {
        isSuccess: true,
        value: specialties,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        error: error.error.message,
      };
    }
  }

}
