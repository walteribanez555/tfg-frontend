import { inject, Injectable } from '@angular/core';
import { CreateScheduleRequestDto } from 'src/app/server/services/schedule/models/create-schedule-request.dto';
import { ResultUseCase } from '../../shared/types/result-use-case.types';
import { Schedule } from '../model/schedule.model';
import { ApiServiceService } from 'src/app/server/services/service/api-service.service';


export interface CreateScheduleUseCase {
  execute(createScheduleRequestDto : CreateScheduleRequestDto) : Promise<ResultUseCase<Schedule, string>>;
}

@Injectable({
  providedIn: 'root'
})
export class CreateScheduleService implements CreateScheduleUseCase {

  #apiService = inject(ApiServiceService);

  async execute(createScheduleRequestDto: CreateScheduleRequestDto): Promise<ResultUseCase<Schedule, string>> {
    // try {
    //   const schedule = await this.#apiService.createSchedule(createScheduleRequestDto);
    //   return {
    //     isSuccess: true,
    //     value: schedule,
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
