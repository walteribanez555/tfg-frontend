import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './service.component';
import { SpecialtyListComponent } from './pages/specialty-list/specialty-list.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceComponent,
    children: [
      {
        path: 'services',
        component: ServiceListComponent,
      },
      {
        path: 'specialties',
        component: SpecialtyListComponent,
      },
      {
        path: '**',
        redirectTo: 'errors/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
