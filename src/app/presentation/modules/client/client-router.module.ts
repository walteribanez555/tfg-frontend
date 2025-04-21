import { NgModule } from "@angular/core";
import { ClientComponent } from "./client.component";
import { RouterModule, Routes } from "@angular/router";



const routes:  Routes = [
  {
    path: '',
    component: ClientComponent,
    children  : []
  },
  {
    path : '**',
    redirectTo : 'errors/404'
  }
]



@NgModule({
  imports : [ RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class ClientRoutingModule { }
