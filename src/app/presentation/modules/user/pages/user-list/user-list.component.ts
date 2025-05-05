import { CommonModule } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { DcDirective } from 'src/app/presentation/shared/directives/dc.directive';
import { UserService } from '../../services/user.service';
import { UserListTableComponent } from "../../components/user-list/user-list-table/user-list-table.component";
import { User } from 'src/app/domain/user/model/user.model';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, DcDirective, UserListTableComponent],
  templateUrl: 'user-list.component.html',
})
export class UserListComponent {
  #userService = inject(UserService);

  dcWrapper = viewChild.required('dcWrapper', { read: DcDirective });
  onShowItem = this.#userService.isShowingDetails;

  onItemSelected(user: User) {
    this.#userService.showItemDetails(user, this.dcWrapper());
  }
}
