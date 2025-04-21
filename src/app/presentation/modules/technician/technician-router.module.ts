import { NgModule } from "@angular/core";
import {RouterModule, Routes } from "@angular/router";
import { TechnicianComponent } from "./technician.component";

const routes : Routes = [
  {
    path : '',
    component : TechnicianComponent,
    children:  [
      {
        path : '**',
        redirectTo : 'errors/404'
      }
    ]
  }
];

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule],
})
export class TechnicianRoutingModule { }
