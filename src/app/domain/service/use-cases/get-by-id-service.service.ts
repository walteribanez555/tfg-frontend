import { Injectable } from '@angular/core';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Service } from '../model/service.model';

export interface GetByIdServiceUseCase {
  execute( id : string) : Promise<ResultUseCase<Service, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class GetByIdServiceService implements GetByIdServiceUseCase {

  async execute(id: string): Promise<ResultUseCase<Service, string>> {
    // try {
    //   const service = await this.#apiService.getByIdService(id);
    //   return {
    //     isSuccess: true,
    //     value: service,
    //   };
    // } catch (error: any) {
    //   return {
    //     isSuccess: false,
    //     error: error.error.message,
    //   };
    // }
    throw new Error('Method not implemented.');
  }

}
