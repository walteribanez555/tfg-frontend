import { Injectable } from '@angular/core';
import { UpdateScheduleRequestDto } from 'src/app/server/services/schedule/models/update-schedule-request.dto';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Schedule } from '../model/schedule.model';

export interface UpdateScheduleUseCase {
  execute(updateScheduleRequestDto: UpdateScheduleRequestDto): Promise<ResultUseCase<Schedule, string>>;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateScheduleService {
  constructor() {}
}
