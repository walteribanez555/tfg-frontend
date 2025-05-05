import { Component, inject, ViewChild } from '@angular/core';
import { TfgListTableComponent } from '../../components/tfg-list/tfg-list-table/tfg-list-table.component';
import { TfgListHeaderComponent } from '../../components/tfg-list/tfg-list-header/tfg-list-header.component';
import { TfgService } from '../../services/tfg.service';
import { DcDirective } from 'src/app/presentation/shared/directives/dc.directive';
import { TfgListDetailComponent } from '../../components/tfg-list/tfg-list-detail/tfg-list-detail.component';
import { Tfg } from '../../models/tfg.model';
import { DetailListener } from 'src/app/presentation/shared/interfaces/Detail.listener';
import { DialogType, DialogPosition } from 'src/app/presentation/shared/enum/dialog';
import { Dialog } from 'src/app/presentation/shared/models/dialog';
import { DialogService } from 'src/app/presentation/shared/services/Dialog.service';
import { ModeService } from '../../services/mode.service';
import { ScolarshipService } from '../../services/scolarship.service';
import { StudentService } from '../../services/student.service';
import { StateTfgService } from '../../services/state-tfg.service';

@Component({
  selector: 'app-tfg-list',
  imports: [TfgListTableComponent, TfgListHeaderComponent, DcDirective],
  templateUrl: './tfg-list.component.html',
})
export class TfgListComponent {
  #tfgService = inject(TfgService);
  #studentService = inject(StudentService);
  #scolarshipService = inject(ScolarshipService);
  #stateService = inject(StateTfgService);
  #modeService = inject(ModeService);
  private dialogService = inject(DialogService);
  @ViewChild(DcDirective) dcWrapper!: DcDirective;

  onShowItem = false;

  detailListerner: DetailListener<Tfg> = {
    close: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    cancel: () => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    submit: (form) => {
      const { date, mode_id, state_id, student_id, tfg_id, title, tutor_id } = form.value;

      const dialog: Dialog = {
        typeDialog: DialogType.isAlert,
        data: {
          title: 'Advertencia',
          description: 'Estas seguro de realizar esta accion',
          icon: 'assets/icons/heroicons/outline/exclamation.svg',
        },
        options: {
          withActions: true,
          position: [DialogPosition.center],
          withBackground: true,
          colorIcon: 'text-red-500',
        },
      };
      this.dialogService.open(dialog).subscribe((resp) => {
        if (resp) {
          this.#tfgService.updateTfg({
            id: tfg_id,
            date: date,
            mode: this.#modeService.getModes()[mode_id].id,
            state: this.#stateService.getStates()[state_id].name,
            studentId: this.#studentService.getStudents()[student_id].id,
            title: title,
            tutorId: this.#scolarshipService.getScolarship()[tutor_id].id,
          })
        }
      });

      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;
    },
    delete: (id) => {
      this.dcWrapper.viewContainerRef.clear();
      this.onShowItem = false;

      const dialog: Dialog = {
        typeDialog: DialogType.isAlert,
        data: {
          title: 'Advertencia',
          description: 'Estas seguro de realizar esta accion',
          icon: 'assets/icons/heroicons/outline/exclamation.svg',
        },
        options: {
          withActions: true,
          position: [DialogPosition.center],
          withBackground: true,
          colorIcon: 'text-red-500',
        },
      };

      this.dialogService.open(dialog).subscribe((resp) => {
        // this.productTypeFacadeService.deleteItem(id as number);
      });
    },
  };

  onSelectItem(tfg: Tfg) {
    const viewContainerRef = this.dcWrapper.viewContainerRef;
    viewContainerRef.clear();
    const componentFactory = viewContainerRef.createComponent(TfgListDetailComponent);
    componentFactory.instance.tfg = tfg;
    componentFactory.instance.detailListener = this.detailListerner;
    this.onShowItem = true;
  }
}
