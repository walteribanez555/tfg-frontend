import { Route, RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { NgModule } from "@angular/core";


const routes : Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'error/404' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule{}
