import { inject, Injectable } from '@angular/core';
import { CreateSpecialtyRequestDto } from 'src/app/server/services/specialty/models/create-specialty-request.dto';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Specialty } from '../model/specialty.model';
import { ApiSpecialtyService } from 'src/app/server/services/specialty/api-specialty.service';


export interface CreateSpecialtyUseCase {
  execute(createSpecialtyRequestDto : CreateSpecialtyRequestDto): Promise<ResultUseCase<Specialty, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class CreateSpecialtyService implements CreateSpecialtyUseCase {
  private apiService = inject(ApiSpecialtyService);

  async execute(createSpecialtyRequestDto: CreateSpecialtyRequestDto): Promise<ResultUseCase<Specialty, string>> {
    try {
      const specialty = await this.apiService.createSpecialty(createSpecialtyRequestDto);
      return {
        isSuccess: true,
        value: specialty,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        error: error.error.message,
      };
    }
  }
}
