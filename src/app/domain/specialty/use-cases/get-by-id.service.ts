import { Injectable } from '@angular/core';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Specialty } from '../model/specialty.model';

export interface GetByIdUseCase {
  execute(id :string) : Promise<ResultUseCase<Specialty, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class GetByIdSpecialtyService implements GetByIdUseCase {

  constructor() { }

  async execute(id: string): Promise<ResultUseCase<Specialty, string>> {
    try {
      throw new Error('Method not implemented.');
    } catch (error: any) {
      return {
        isSuccess: false,
        error: error.error.message,
      };
    }
  }

}
