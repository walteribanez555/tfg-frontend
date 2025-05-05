import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Trabajos Fin de Grado',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/wrench-screwdriver.svg',
          label: 'Lista de trabajos',
          route: '/dashboard/tfg/list',
        },
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Detalles de trabajos',
          route: '/dashboard/tfg/student',
        }
      ],
    },

  ];
}
