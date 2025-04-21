import { Component, inject } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { UserService } from 'src/app/presentation/modules/user/services/user.service';

@Component({
  selector: 'app-user-list-table-action',
  imports: [AngularSvgIconModule],
  templateUrl: 'user-list-table-action.component.html',
})
export class UserListTableActionComponent {
  #userService = inject(UserService);
  total = this.#userService.total;
  limit = this.#userService.limit;
  offset = this.#userService.offset;

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
    // this.filterService.searchField.set(input.value);
  }

  onStatusChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    // this.filterService.statusField.set(selectElement.value);
  }

  onOrderChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    // this.filterService.orderField.set(selectElement.value);
  }
}
