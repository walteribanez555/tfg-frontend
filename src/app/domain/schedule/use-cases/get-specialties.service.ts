import { Injectable } from '@angular/core';
import { PaginationResponseDto } from 'src/app/server/services/shared/dto/pagination-response.dto';
import { PaginationDto } from 'src/app/server/services/shared/dto/pagination.dto';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Specialty } from '../../specialty/model/specialty.model';

export interface GetSpecialtiesUseCase {
  execute( paginationDto : PaginationDto) : Promise<ResultUseCase<PaginationResponseDto<Specialty>, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class GetSpecialtiesService {

  constructor() { }

}
