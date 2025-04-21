import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { CreateSpecialtyRequestDto } from './models/create-specialty-request.dto';
import { UpdateSpecialtyRequestDto } from './models/update-specialty-request.dto';
import { Specialty } from 'src/app/domain/specialty/model/specialty.model';
import { PaginationResponseDto } from '../shared/dto/pagination-response.dto';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiSpecialtyService {
  #http = inject(HttpClient);

  #baseUrl = `${environment.url}/specialty`;

  getSpecialties( paginationDto :PaginationDto ) :Promise<PaginationResponseDto<Specialty>> {
    return firstValueFrom( this.#http.get<PaginationResponseDto<Specialty>>(`${this.#baseUrl}`, { params: paginationDto as any }))
  }

  createSpecialty( specialtyRequestDto : CreateSpecialtyRequestDto ): Promise<Specialty> {
    return firstValueFrom(this.#http.post<Specialty>(`${this.#baseUrl}`, specialtyRequestDto));
  }

  updateSpecialty( id : string, updateSpecialtyRequestDto : UpdateSpecialtyRequestDto ) : Promise<Specialty> {
    return firstValueFrom(this.#http.patch<Specialty>(`${this.#baseUrl}?id=${id}`, updateSpecialtyRequestDto));
  }


}
