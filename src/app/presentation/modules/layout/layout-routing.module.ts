import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { authGuard } from '../../core/guards/auth.guard';
import { TfgStudentDetailComponent } from '../tfg/pages/tfg-student-detail/tfg-student-detail.component';
import { BackgroundDefaultComponent } from '../../shared/components/background-default/background-default.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'student',
    component: BackgroundDefaultComponent,
    children: [
      {
        path: 'tfg',
        component: TfgStudentDetailComponent,
      }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
