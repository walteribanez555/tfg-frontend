import {  Component, computed, inject, OnInit,  output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { TableFooterComponent } from '../../../../uikit/pages/table/components/table-footer/table-footer.component';
import { UserFilterService } from '../../../services/user-filter.service';
import { UserListTableActionComponent } from './components/user-list-table-action/user-list-table-action.component';
import { UserListTableRowComponent } from './components/user-list-table-row/user-list-table-row.component';
import { UserListHeaderComponent } from '../user-list-header/user-list-header.component';
import { UserListTableHeaderComponent } from './components/user-list-table-header/user-list-table-header.component';
import { User } from 'src/app/domain/user/model/user.model';

@Component({
  selector: 'app-user-list-table',
  imports: [TableFooterComponent, UserListTableActionComponent, UserListTableRowComponent, UserListHeaderComponent, UserListTableHeaderComponent],
  templateUrl: 'user-list-table.component.html',
})
export class UserListTableComponent implements OnInit {
  ngOnInit(): void {
    this.#userService.onLoadUsers({
      limit: this.limit,
      offset: this.offset,
    });
  }
  #userService = inject(UserService);
  #userFilterService = inject(UserFilterService);

  onUserSelected = output<User>();

  protected readonly users = this.#userService.users;
  protected readonly isLoading = this.#userService.isLoading;

  limit = 20;

  offset = 0;

  filteredUsers = computed(() => {
    const search = this.#userFilterService.searchField().toLowerCase();

    return this.users().filter(
      (user) => user.fullName.toLowerCase().includes(search) || user.email.toLowerCase().includes(search),
    );
  });
}
