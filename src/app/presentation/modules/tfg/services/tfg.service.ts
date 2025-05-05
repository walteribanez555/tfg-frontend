import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TfgStudent } from '../models/tfg-student.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tfg } from '../models/tfg.model';
import { ModalService } from 'src/app/presentation/shared/services/Modal.service';
import { DynamicForm } from 'src/app/presentation/shared/types/dynamic.types';
import { FormTemplateComponent } from 'src/app/presentation/shared/components/form-template/form-template.component';
import { InputTextComponent } from 'src/app/presentation/shared/components/form-inputs/input-text/input-text.component';
import { FormControl } from '@angular/forms';
import { ModalFormComponent } from 'src/app/presentation/shared/components/modal-form/modal-form.component';
import { ActionType } from 'src/app/presentation/shared/enum/action';
import { responseModalFormMapper } from 'src/app/presentation/shared/utils/mappers/response-modal-form/response-modal-form';
import { InputDateComponent } from 'src/app/presentation/shared/components/form-inputs/input-date/input-date.component';
import { Student } from '../models/student.model';
import { Scolarship } from '../models/tutor.model';
import { InputSelectComponent } from 'src/app/presentation/shared/components/form-inputs/input-select/input-select.component';
import { StudentService } from './student.service';
import { ScolarshipService } from './scolarship.service';
import { Mode } from '../models/mode.model';
import { ModeService } from './mode.service';
import { updateTfg } from '../models/update-tfg.model';
import { DialogService } from 'src/app/presentation/shared/services/Dialog.service';
import { downloadCSV, generateCsv } from 'src/app/presentation/utils/reports.utils';
import { StateTfgService } from './state-tfg.service';
import { ItemList } from 'src/app/presentation/shared/components/item-list/interfaces/ItemList.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TfgService {
  constructor() {}
  #modalService = inject(ModalService);
  #dialogService = inject(DialogService);
  #studentService = inject(StudentService);
  #scolarshipService = inject(ScolarshipService);
  #stateTfgService = inject(StateTfgService);
  #modeService = inject(ModeService);
  #http = inject(HttpClient);
  #api = `${environment.url}/tfg`;

  students: Student[] = this.#studentService.getStudents();
  tutors: Scolarship[] = this.#scolarshipService.getScolarship();
  modes: Mode[] = this.#modeService.getModes();
  states: ItemList[] = this.#stateTfgService.getStates();

  /**Is Showing the user details */
  isShowingDetails = signal<boolean>(false);

  listTfg: WritableSignal<TfgStudent[]> = signal([]);
  listAllTfg: WritableSignal<Tfg[]> = signal([]);

  addTfg() {
    const addTfgForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Crear TFG',
        description: 'Detalles para crear un TFG',
      },
      dynamicFields: [
        {
          component: InputTextComponent,
          data: {
            title: 'Titulo del proyecto',
            id: 'title',
            placeholder: 'Titulo del proyecto',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputSelectComponent,
          data: {
            items: this.students.map((student, index) => {
              return {
                id: index,
                name: student.name,
              };
            }),
            title: 'Estudiante',
            id: 'student',
          },
          fieldFormControl: new FormControl(1),
        },
        {
          component: InputSelectComponent,
          data: {
            items: this.tutors.map((tutor, index) => {
              return {
                id: index,
                name: tutor.name,
              };
            }),
            title: 'Tutor',
            id: 'tutor',
          },
          fieldFormControl: new FormControl(1),
        },
        {
          component: InputSelectComponent,
          data: {
            items: this.modes.map((mode, index) => {
              return {
                id: index,
                name: mode.name,
              };
            }),
            title: 'Modalidad',
            id: 'mode',
          },
          fieldFormControl: new FormControl(1),
        },
        {
          component: InputDateComponent,
          data: {
            title: 'Fecha de entrega',
            id: 'date',
            placeholder: 'Fecha de entrega',
          },
          fieldFormControl: new FormControl(),
        },
      ],
    };

    this.#modalService
      .open(ModalFormComponent, {
        title: 'Agrega un Trabajo de Fin de Grado',
        size: 'sm',
        forms: [addTfgForm],
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
        const { title, date, tutor, student, mode } = responseModalFormMapper(result);

        if(!title || !date || !tutor || !student || !mode) {
          this.#dialogService.showError({
            description: 'Por favor completa todos los campos',
          });
          return;
        }

        const createTfgRequest = {
          title,
          date,
          tutorId: this.tutors[tutor].id,
          studentId: this.students[student].id,
          mode: this.modes[mode].id,
        };

        this.#http.post<Tfg>(this.#api, createTfgRequest).subscribe((resp) => {
          this.getAllTfgs();
          this.#dialogService.ShowSuccess({
            description: 'El TFG fue creado correctamente',
          });
        });
      });
  }


  generateTfgReport() {
    const reportForm: DynamicForm = {
      component: FormTemplateComponent,
      data: {
        title: 'Parametros de Reporte',
        description: 'Filtros necesarios para generar el reporte',
      },
      dynamicFields: [
        {
          component: InputSelectComponent,
          data: {
            items: this.states,
            title: 'Estado',
            id: 'state',
          },
          fieldFormControl: new FormControl(1),
        },
        {
          component: InputSelectComponent,
          data: {
            items: this.modes.map((mode, index) => {
              return {
                id: index,
                name: mode.name,
              };
            }),
            title: 'Modalidad',
            id: 'mode',
          },
          fieldFormControl: new FormControl(1),
        },
        {
          component: InputDateComponent,
          data: {
            title: 'Inicio',
            id : 'init',
          },
          fieldFormControl: new FormControl(),
        },
        {
          component: InputDateComponent,
          data: {
            title: 'Fin',
            id : 'end',
          },
          fieldFormControl: new FormControl(),
        },
      ],
    };

    this.#modalService
      .open(ModalFormComponent, {
        title: 'Generar Reporte',
        size: 'sm',
        forms: [reportForm],
        data: {},
        icon: 'assets/icons/heroicons/outline/plus.svg',
        actions: [
          {
            action: ActionType.Create,
            title: 'Generar',
          },
        ],
      })
      .subscribe(async (result) => {
        const { state, mode, init, end } = responseModalFormMapper(result);


        let reportRequest: { state: string; mode: string; init?: any; end?: any } = {
          state: this.states.find((s) => s.id === state)!.name,
          mode: this.modes[mode].id,
        };
        if (init) {
          reportRequest.init = init;
        }
        if (end) {
          reportRequest.end = end;
        }

        this.report(reportRequest);
      });
  }

  getAllTfgs() {
    this.#http.get<Tfg[]>(this.#api).subscribe((resp) => {
      this.listAllTfg.set(resp);
    });
  }

  getTfgByUserId(userId: string) {
    this.#http.get<TfgStudent[]>(`${this.#api}/student?id=${userId}`).subscribe((resp) => {
      this.listTfg.set(resp);
    });
  }

  report( params: {[key:string] : any}){
    this.#http.get<Tfg[]>(`${this.#api}/report`, {params}).subscribe((resp) => {
      if(resp.length === 0) {
        this.#dialogService.showError({
          description: 'No se encontraron resultados',
        });
        return;
      }
      const csvContent = generateCsv(resp);
      const fileName = `tfg_report_${new Date().toISOString()}.csv`;
      downloadCSV(csvContent, fileName);
    });
  }

  updateTfg(updateTfg: updateTfg) {
    this.#http.patch(`${this.#api}`, updateTfg).subscribe((resp) => {
      this.getAllTfgs();
      this.#dialogService.ShowSuccess({
        description: 'El TFG fue actualizado correctamente',
      });
    });
  }
}
