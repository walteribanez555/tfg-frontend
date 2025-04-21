import { Injectable } from '@angular/core';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Schedule } from '../model/schedule.model';

export interface GetByIdScheduleService {
  execute(id: string): Promise<ResultUseCase<Schedule, string>>;
}

@Injectable({
  providedIn: 'root',
})
export class GetByIdScheduleService {
  constructor() {}
}
