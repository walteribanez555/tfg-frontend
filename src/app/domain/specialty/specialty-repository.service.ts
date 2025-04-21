import { inject, Injectable } from '@angular/core';
import { CreateSpecialtyService } from './use-cases/create-specialty.service';
import { GetByIdSpecialtyService } from './use-cases/get-by-id.service';
import { GetSpecialtiesService } from './use-cases/get-specialties.service';
import { UpdateSpecialtyService } from './use-cases/update-specialty.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyRepositoryService {
  createSpecialty = inject(CreateSpecialtyService);
  getSpecialty = inject(GetByIdSpecialtyService);
  getSpecialties = inject(GetSpecialtiesService);
  updateSpecialty = inject(UpdateSpecialtyService);
}
