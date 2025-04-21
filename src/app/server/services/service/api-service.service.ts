import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { PaginationResponseDto } from '../shared/dto/pagination-response.dto';
import { Service } from 'src/app/domain/service/model/service.model';
import { UpdateServiceRequestDto } from './models/update-service-request.dto';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  #http = inject(HttpClient);
  #baseUrl = `${environment.url}/service`;

  getServices( paginationDto : PaginationDto) : Promise<PaginationResponseDto<Service>>{
    return firstValueFrom(this.#http.get<PaginationResponseDto<Service>>(this.#baseUrl, { params: paginationDto as any }))
  }

  createService(createServiceRequestDto: any): Promise<Service> {
    return firstValueFrom(this.#http.post<Service>(`${this.#baseUrl}`, createServiceRequestDto));
  }

  updateService(id: string, updateServiceRequestDto: UpdateServiceRequestDto): Promise<Service> {
    return firstValueFrom(this.#http.patch<Service>(`${this.#baseUrl}?id=${id}`, updateServiceRequestDto));
  }

  getServiceById(id: string): Promise<Service> {
    throw new Error('Method not implemented.');
  }
}
