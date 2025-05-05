import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { timer } from 'rxjs';
import { Menu } from '../constants/menu';
import { SubMenuItem } from '../models/menu.model';
import { AuthService } from 'src/app/server/services/auth/auth.service';
import { DialogService } from '../../shared/services/Dialog.service';
import { DialogPosition, DialogType } from '../../shared/enum/dialog';
import { Dialog } from '../../shared/models/dialog';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const dialogService = inject(DialogService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if(!token || !user) {
    const dialogSuccess: Dialog = {
      typeDialog: DialogType.isAlert,
      data: {
        title: 'Acceso denegado',
        description: `No tiene permisos para acceder a la pagina ${state.url}, comuniquese con el administrador`,
        icon: 'assets/icons/heroicons/outline/cog.svg',
      },
      options: {
        withBackground: true,
        position: [DialogPosition.center],
        colorIcon: 'text-red-500',
        timeToShow: timer(2000),
      },
    };
    dialogService.open(dialogSuccess).subscribe(() => {
      router.navigate(['/auth/signin']);
    });

    return false
  }


  return true;
};
