import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'client', pathMatch: 'full' },
      { path: 'user', loadChildren: () => import('../user/user.module').then((m) => m.UserModule) },
      { path: 'client', loadChildren: () => import('../client/client.module').then((m) => m.ClientModule) },
      { path: 'service', loadChildren: () => import('../service/service.module').then((m) => m.ServiceModule) },
      { path: 'schedule', loadChildren: () => import('../schedule/schedule.module').then((m) => m.ScheduleModule) },
      {
        path: 'technician',
        loadChildren: () => import('../technician/technician.module').then((m) => m.TechnicianModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
