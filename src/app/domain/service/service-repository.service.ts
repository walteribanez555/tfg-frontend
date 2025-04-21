import { inject, Injectable } from '@angular/core';
import { CreateServiceService } from './use-cases/create-service.service';
import { GetServicesService } from './use-cases/get-services.service';
import { GetByIdServiceService } from './use-cases/get-by-id-service.service';
import { UpdateServiceService } from './use-cases/update-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceRepositoryService {
  createService = inject(CreateServiceService);
  getService = inject(GetByIdServiceService);
  getServices = inject(GetServicesService);
  updateService = inject(UpdateServiceService);
}
