import { inject, Injectable } from '@angular/core';
import { UpdateSpecialtyRequestDto } from 'src/app/server/services/specialty/models/update-specialty-request.dto';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Specialty } from '../model/specialty.model';
import { ApiSpecialtyService } from 'src/app/server/services/specialty/api-specialty.service';

export interface UpdateSpecialtyUseCase {
  execute(id: string, updateSpecialtyRequestDto: UpdateSpecialtyRequestDto): Promise<ResultUseCase<Specialty, string>>;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateSpecialtyService implements  UpdateSpecialtyUseCase {
  #apiService = inject(ApiSpecialtyService);

  async execute(id: string, updateSpecialtyRequestDto: UpdateSpecialtyRequestDto): Promise<ResultUseCase<Specialty, string>> {
    try {
      const specialty = await this.#apiService.updateSpecialty(id, updateSpecialtyRequestDto);
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
