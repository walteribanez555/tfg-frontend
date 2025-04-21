import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector, Type } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Dialog } from '../models/dialog';
import { DialogPosition, DialogType } from '../enum/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogNotifier?: Subject<any>;

  onOpen = timer(1000);

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  open(dialog: Dialog) {
    const dialogComponentFactory = this.resolver.resolveComponentFactory(DialogComponent);

    const dialogComponentRef = dialogComponentFactory.create(this.injector);

    const dialogComponent = dialogComponentRef.instance;

    if (dialog.typeDialog) {
      // dialogComponent.position = [DialogPosition.center];

      switch (dialog.typeDialog) {
        case DialogType.isAlert:
          dialogComponent.iconUrl = 'assets/icons/heroicons/outline/exclamation.svg';
          dialogComponent.colorIcon = 'text-orange-500';
          break;

        case DialogType.isSuccess:
          dialogComponent.iconUrl = 'assets/icons/heroicons/outline/check-badge.svg';
          dialogComponent.colorIcon = 'text-green-700';
          break;

        case DialogType.isLoading:
          dialogComponent.iconUrl = 'assets/icons/loading.svg';
          dialogComponent.colorIcon = 'text-primary';
          break;

        case DialogType.isError:
          dialogComponent.iconUrl = 'assets/icons/heroicons/outline/exclamation.svg';
          dialogComponent.colorIcon = 'text-red-500';
          break;
      }
    } else {
    }

    if (dialog.options) {
      dialogComponent.position = dialog.options.position;
      dialogComponent.withActions = dialog.options.withActions;
      dialogComponent.timerClose$ = dialog.options.timeToShow ? dialog.options.timeToShow : null;
      dialogComponent.withBackground = dialog.options.withBackground;
      dialogComponent.colorIcon = dialog.options.colorIcon;
    }

    if (dialog.data) {
      dialogComponent.title = dialog.data.title;
      dialogComponent.description = dialog.data.description;
      dialogComponent.iconUrl = dialog.data.icon ?? 'assets/icons/heroicons/outline/check-badge.svg';
    }

    if (dialog.listener) {
      dialogComponent.notifierFromParent = dialog.listener;
    }

    dialogComponent.closeEvent.subscribe(() => {
      this.closeDialog();
    }),
      dialogComponent.submitEvent.subscribe(() => {
        this.submitDialog();
      });

    dialogComponent.cancelEvent.subscribe(() => {});

    this.onOpen.subscribe(() => {
      dialogComponentRef.hostView.detectChanges();
      dialogComponent.isOpen = true;
    });

    this.document.body.appendChild(dialogComponentRef.location.nativeElement);
    dialogComponentRef.hostView.detectChanges();

    this.dialogNotifier = new Subject();

    return this.dialogNotifier.asObservable();
  }

  ShowSuccess(options: { description: string; listener?: Subject<any>; timer?: Observable<any> }) {
    const dialog: Dialog = {
      typeDialog: DialogType.isSuccess,
      listener: options.listener,
      data: {
        title: 'Realizado con éxito',
        description: options.description,
        icon: 'assets/icons/heroicons/outline/check-badge.svg',
      },
      options: {
        withBackground: true,
        position: [DialogPosition.top, DialogPosition.right],
        colorIcon: 'text-green-500',
        timeToShow: options.timer ?? timer(2000),
      },
    };

    this.open(dialog);
  }

  showLoading(options: { description: string; listener?: Subject<any>; timer?: Observable<any> }) {
    const dialog: Dialog = {
      typeDialog: DialogType.isLoading,
      listener: options.listener,
      data: {
        title: 'Cargando',
        description: options.description,
        icon: 'assets/icons/loading.svg',
      },
      options: {
        withActions: false,
        withBackground: true,
        position: [DialogPosition.center],
        colorIcon: 'text-primary',
      },
    };

    return this.open(dialog);
  }

  showError(options: { description: string; listener?: Subject<any>; timer?: Observable<any> }) {
    const dialog: Dialog = {
      typeDialog: DialogType.isError,
      listener: options.listener,
      data: {
        title: 'Error',
        description: options.description,
        icon: 'assets/icons/heroicons/outline/exclamation.svg',
      },
      options: {
        withBackground: true,
        position: [DialogPosition.top, DialogPosition.right],
        colorIcon: 'text-red-500',
        timeToShow: options.timer ?? timer(2000),
      },
    };

    return this.open(dialog);
  }

  showAlert(options: { description: string }) {
    const dialog = {
      typeDialog: DialogType.isAlert,
      data: {
        title: 'Advertencia',
        description: options.description,
        icon: 'assets/icons/heroicons/outline/exclamation.svg',
      },
      options: {
        withActions: true,
        position: [DialogPosition.center],
        withBackground: true,
        colorIcon: 'text-red-500',
      },
    };

    return this.open(dialog);
  }

  closeDialog() {
    this.dialogNotifier?.complete();
  }

  submitDialog() {
    this.dialogNotifier?.next(null);
    this.closeDialog();
  }

  cancelDialog() {
    this.dialogNotifier?.error(null);
    this.closeDialog();
  }
}
