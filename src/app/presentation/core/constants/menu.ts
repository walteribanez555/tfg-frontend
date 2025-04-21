import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Usuarios',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Todos',
          route: '/dashboard/user',
        },
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Estudiantes',
          route: '/dashboard/client',
        },
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Administrativos',
          route: '/dashboard/technician',
        },
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Docentes',
          route: '/dashboard/technician',
        },
        {
          icon: 'assets/icons/heroicons/outline/user-circle.svg',
          label: 'Tribunales',
          route: '/dashboard/technician',
        },
      ],
    },
    {
      group: 'Trabajos Fin de Grado',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/wrench-screwdriver.svg',
          label: 'Lista de trabajos',
          route: '/dashboard/service/services',
        },
      ],
    },
    // {
    //   group: 'Reportes',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/schedule.svg',
    //       label: 'Citas',
    //       route: '/dashboard/schedule',
    //     },
    //   ],
    // },
  ];
}
