import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Service } from 'src/app/domain/service/model/service.model';
import { ServiceRepositoryService } from 'src/app/domain/service/service-repository.service';
import { DcDirective } from 'src/app/presentation/shared/directives/dc.directive';
import { ModalService } from 'src/app/presentation/shared/services/Modal.service';
import { ServiceListDetailComponent } from '../components/service-list/service-list-detail/service-list-detail.component';
import { StateCallback } from 'src/app/presentation/shared/types/state-callback.types';
import { DynamicForm } from 'src/app/presentation/shared/types/dynamic.types';
import { FormTemplateComponent } from 'src/app/presentation/shared/components/form-template/form-template.component';
import { ModalFormComponent } from 'src/app/presentation/shared/components/modal-form/modal-form.component';
import { ActionType } from 'src/app/presentation/shared/enum/action';
import { responseModalFormMapper } from 'src/app/presentation/shared/utils/mappers/response-modal-form/response-modal-form';
import { CreateServiceRequestDto } from 'src/app/server/services/service/models/create-service-request.dto';
import { PaginationDto } from 'src/app/server/services/shared/dto/pagination.dto';
import { InputTextComponent } from 'src/app/presentation/shared/components/form-inputs/input-text/input-text.component';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  #modalService = inject(ModalService);
  #serviceRepository = inject(ServiceRepositoryService);

  constructor() {}
  #containerItem: WritableSignal<DcDirective | null> = signal(null);

  /**Is Showing the user details */
  isShowingDetails = signal<boolean>(false);

  /**Is Loading */
  isLoading = signal<boolean>(false);

  /**Selected user */
  selectedService = signal<Service | null>(null);

  /** Users */
  services = signal<Service[]>([]);

  /** Limit */
  limit = signal<number>(10);

  /** Offset */
  offset = signal<number>(0);

  /** Total */
  total = signal<number>(0);

  /**User Details Form */
  servicesDetailsForm = signal<FormGroup | null>(null);

  showItemDetails(service: Service, dcWrapper: DcDirective) {
    this.selectedService.set(service);
    this.onCreateFormServiceDetails();
    this.#containerItem.set(dcWrapper);

    const viewContainerRef = this.#containerItem()!.viewContainerRef;
    viewContainerRef.clear();
    const componentFactory = viewContainerRef.createComponent(ServiceListDetailComponent);
  }

  closeItemDetails() {
    this.#containerItem()!.viewContainerRef.clear();
    this.selectedService.set(null);
    this.isShowingDetails.set(false);
  }

  onCreateFormServiceDetails() {
    if (!this.selectedService()) {
      return;
    }
    this.servicesDetailsForm.set(
      new FormGroup({
        id: new FormControl(this.selectedService()?.id),
        name: new FormControl(this.selectedService()?.name),
        description: new FormControl(this.selectedService()?.description),
        price: new FormControl(this.selectedService()?.price),
        duration: new FormControl(this.selectedService()?.duration),
      }),
    );
  }

  onCreateService(stateCallback?: StateCallback<Service, string>) {
    const detailForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Crear Servicio',
        description: 'Secciona el servicio que deseas crear',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            title: 'Nombre del servicio',
            id: 'name',
            placeholder: 'Nombre del servicio',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputTextComponent,
          data: {
            title: 'Descripción del servicio',
            id: 'description',
            placeholder: 'Descripción del servicio',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputTextComponent,
          data: {
            title: 'Precio del servicio',
            id: 'price',
            placeholder: 'Precio del servicio',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputTextComponent,
          data: {
            title: 'Duración del servicio',
            id: 'duration',
            placeholder: 'Duración del servicio',
          },
          fieldFormControl: new FormControl(),
        }
      ],
    };

    this.#modalService
      .open(ModalFormComponent, {
        title: 'Crear Servicio',
        size: 'sm',
        forms: [detailForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Crear',
          },
        ],
      })
      .subscribe(async (result) => {
        const { name, description, price, duration } = responseModalFormMapper(result);

        const createServiceRequestDto: CreateServiceRequestDto = {
          name,
          description,
          price: Number(price),
          duration: Number(duration),
        };

        await this.#createService(createServiceRequestDto, stateCallback);
      });
  }

  onLoadServices(paginationDto: PaginationDto) {
    this.#loadServices(paginationDto);
  }

  updateServices(stateCallback?: StateCallback<Service, string>) {
    const { id, name, description, price, duration } = this.servicesDetailsForm()?.value;
    const serviceToUpdate: Service = {
      id,
      name,
      description,
      price : Number(price),
      duration: Number(duration),
    };
    this.#serviceToUpdate(serviceToUpdate, stateCallback);
  }

  async #createService(
    createServiceRequestDto: CreateServiceRequestDto,
    stateCallback?: StateCallback<Service, string>,
  ) {
    if (stateCallback) {
      stateCallback.onLoading();
    }

    this.isLoading.set(true);
    const result = await this.#serviceRepository.createService.execute(createServiceRequestDto);

    this.isLoading.set(false);

    if (result.isSuccess) {
      if (stateCallback) {
        stateCallback.onResult(result.value);
      }
    } else {
      if (stateCallback) {
        stateCallback.onError(result.error);
      }
    }
    if (stateCallback) {
      stateCallback.onComplete();
    }
  }

  async #serviceToUpdate(service: Service, stateCallback?: StateCallback<Service, string>) {
    if (stateCallback) {
      stateCallback.onLoading();
    }

    this.isLoading.set(true);

    const { id, ...serviceToUpdate } = service;

    const result = await this.#serviceRepository.updateService.execute(id, serviceToUpdate);

    if (result.isSuccess) {
      if (stateCallback) {
        stateCallback.onResult(result.value);
      }
      this.selectedService.set(result.value);
    } else {
      if (stateCallback) {
        stateCallback.onError(result.error);
      }
      console.error('Error updating service');
    }
  }

  async #loadServices(paginationDto: PaginationDto) {
    this.isLoading.set(true);
    const result = await this.#serviceRepository.getServices.execute(paginationDto);
    this.isLoading.set(false);

    if (result.isSuccess) {
      const { total, items, limit, offset } = result.value;
      this.total.set(total);
      this.services.set(items);
      this.limit.set(limit);
      this.offset.set(offset);
    } else {
      console.error('Error loading services');
    }
    this.isLoading.set(false);
  }
}
