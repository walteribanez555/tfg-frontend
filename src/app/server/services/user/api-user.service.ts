import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { UpdateUserRequestDto } from './models/update-user-request.dto';
import { CreateUserRequestDto } from './models/create-user-request.dto';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/domain/user/model/user.model';
import { firstValueFrom } from 'rxjs';
import { PaginationResponseDto } from '../shared/dto/pagination-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  #http = inject(HttpClient);

  #baseUrl = `${environment.url}/user`;

  /** Create a new User
   * @param createUserRequestDto User data to create
   * @returns User
  */
  create(createUserRequestDto: CreateUserRequestDto): Promise<User> {
    return firstValueFrom(this.#http.post<User>(`${environment.url}/auth/register`, createUserRequestDto));
  }

  /** Update an existing User
   * @param id User Id
   * @param updateUserRequestDto User data to update
   * @returns User
  */
  update(id: string, updateUserRequestDto: UpdateUserRequestDto): Promise<User> {
    return firstValueFrom(this.#http.patch<User>(`${this.#baseUrl}?id=${id}`, updateUserRequestDto));
  }

  /** Get a user By Id
   * @param id User Id
   * @returns User
   * */
  getById(id: string): Promise<User> {
    return firstValueFrom(this.#http.get<User>(`${this.#baseUrl}?id=${id}`));
  }

  get(paginationDto: PaginationDto): Promise<PaginationResponseDto<User>> {
    return firstValueFrom(this.#http.get < PaginationResponseDto<User>>(this.#baseUrl, { params: paginationDto as any }));
  }
}
