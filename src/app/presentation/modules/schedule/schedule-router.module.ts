import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScheduleComponent } from "./schedule.component";

const routes:  Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children  : []
  },
  {
    path : '**',
    redirectTo : 'errors/404'
  }
]

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class ScheduleRoutingModule { }
