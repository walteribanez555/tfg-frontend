import { RouterModule, Routes } from "@angular/router";
import { TfgComponent } from "./tfg.component";
import { TfgListComponent } from "./pages/tfg-list/tfg-list.component";
import { NgModule } from "@angular/core";
import { TfgStudentDetailComponent } from "./pages/tfg-student-detail/tfg-student-detail.component";


const routes : Routes = [
  {
    path : '',
    component: TfgComponent,
    children: [
      {
        path : '',
        redirectTo : 'list',
        pathMatch : 'full'
      },
      {
        path : 'list',
        component : TfgListComponent
      },
      {
        path: 'student',
        component : TfgStudentDetailComponent,
      },
      {
        path: '**',
        redirectTo : 'error/404'
      }
    ]
  }
]

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class TfgRoutingModule{}
