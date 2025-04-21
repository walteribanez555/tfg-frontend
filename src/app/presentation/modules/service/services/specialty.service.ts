import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Specialty } from 'src/app/domain/specialty/model/specialty.model';
import { SpecialtyRepositoryService } from 'src/app/domain/specialty/specialty-repository.service';
import { InputTextComponent } from 'src/app/presentation/shared/components/form-inputs/input-text/input-text.component';
import { FormTemplateComponent } from 'src/app/presentation/shared/components/form-template/form-template.component';
import { ModalFormComponent } from 'src/app/presentation/shared/components/modal-form/modal-form.component';
import { DcDirective } from 'src/app/presentation/shared/directives/dc.directive';
import { ActionType } from 'src/app/presentation/shared/enum/action';
import { ModalService } from 'src/app/presentation/shared/services/Modal.service';
import { DynamicForm } from 'src/app/presentation/shared/types/dynamic.types';
import { StateCallback } from 'src/app/presentation/shared/types/state-callback.types';
import { responseModalFormMapper } from 'src/app/presentation/shared/utils/mappers/response-modal-form/response-modal-form';
import { PaginationDto } from 'src/app/server/services/shared/dto/pagination.dto';
import { CreateSpecialtyRequestDto } from 'src/app/server/services/specialty/models/create-specialty-request.dto';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  #modalService = inject(ModalService);
  #specialtyRepository = inject(SpecialtyRepositoryService);

  constructor() {}

  #containerItem: WritableSignal<DcDirective | null> = signal(null);

  /**Is Showing the user details */
  isShowingDetails = signal<boolean>(false);

  /**Is Loading */
  isLoading = signal<boolean>(false);

  /**Selected user */
  selectedSpecialty = signal<Specialty | null>(null);

  /** Users */
  specialties = signal<Specialty[]>([]);

  /** Limit */
  limit = signal<number>(10);

  /** Offset */
  offset = signal<number>(0);

  /** Total */
  total = signal<number>(0);

  /**User Details Form */
  specialtyDetailsForm = signal<FormGroup | null>(null);

  showItemDetails(specialty: Specialty, dcWrapper: DcDirective) {
    this.selectedSpecialty.set(specialty);
    this.onCreateFormSpecialtyDetails();
    this.#containerItem.set(dcWrapper);

    const viewContainerRef = this.#containerItem()!.viewContainerRef;
    viewContainerRef.clear();
  }

  closeItemDetails() {
    this.#containerItem()!.viewContainerRef.clear();
    this.selectedSpecialty.set(null);
    this.isShowingDetails.set(false);
  }

  onCreateFormSpecialtyDetails() {
    if (!this.selectedSpecialty()) {
      return;
    }
    this.specialtyDetailsForm.set(
      new FormGroup({
        id: new FormControl(this.selectedSpecialty()?.id),
        name: new FormControl(this.selectedSpecialty()?.name),
      })
    );
  }

  onCreateSpecialty(stateCallback: StateCallback<Specialty, string>) {
    const detailForm: DynamicForm = {
      component : FormTemplateComponent,
      data : {
        title : 'Crear Especialidad',
        description: 'Crear Especialidad',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            title: 'Nombre',
            id: 'name',
            placeholder: 'Nombre de la especialidad',
          },
          fieldFormControl : new FormControl(),
        }
      ]
    }

    this.#modalService.open(
      ModalFormComponent, {
        title: 'Crear especialidad',
        size: 'sm',
        forms: [detailForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Crear',
          }
        ]
      }
    ).subscribe( async (result) => {
      const { name } = responseModalFormMapper(result);

      const createSpecialtyRequestDto = {
        name,
      };

      this.#createService(createSpecialtyRequestDto, stateCallback);

    })
  }

  async #createService(
    createSpecialtyRequestDto: CreateSpecialtyRequestDto,
    stateCallback: StateCallback<Specialty, string>
  ) {
    if(stateCallback){
      stateCallback.onLoading();
    }
    this.isLoading.set(true);
    const result = await this.#specialtyRepository.createSpecialty.execute(createSpecialtyRequestDto);

    this.isLoading.set(false);

    if(result.isSuccess){
      if(stateCallback){
        stateCallback.onResult(result.value);
      }
    }else{
      if(stateCallback){
        stateCallback.onError(result.error);
      }
    }
    if(stateCallback){
      stateCallback.onComplete();
    }
  }

  onLoadSpecialties(paginationDto: PaginationDto) {
    this.#loadSpecialties(paginationDto);
  }

  updateSpecialties(stateCallback?: StateCallback<Specialty, string>) {
    const { id, name } = this.specialtyDetailsForm()?.value;
    const specialtyToUpdate: Specialty = {
      id,
      name,
    };
    this.#specialtyToUpdate(specialtyToUpdate, stateCallback);
  }

  async #specialtyToUpdate(
    specialty: Specialty,
    stateCallback?: StateCallback<Specialty, string>
  ) {
    if(stateCallback){
      stateCallback.onLoading();
    }
    this.isLoading.set(true);

    const {id, ...specialtyToUpdate} = specialty;
    const result = await this.#specialtyRepository.updateSpecialty.execute(id, specialtyToUpdate);

    this.isLoading.set(false);

    if(result.isSuccess){
      if(stateCallback){
        stateCallback.onResult(result.value);
      }
    }else{
      if(stateCallback){
        stateCallback.onError(result.error);
      }
    }
    if(stateCallback){
      stateCallback.onComplete();
    }
  }

  async #loadSpecialties(paginationDto: PaginationDto){
    this.isLoading.set(true);
    const result = await this.#specialtyRepository.getSpecialties.execute(paginationDto);
    this.isLoading.set(false);

    if(result.isSuccess){
      const { total, items, limit, offset} = result.value;
      this.total.set(total);
      this.specialties.set(items);
      this.limit.set(limit);
      this.offset.set(offset);
    }else{
      console.error(result.error);
    }
    this.isLoading.set(false);

  }
}
