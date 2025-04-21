import { NgClass } from '@angular/common';
import {  Component, input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from 'src/app/domain/user/model/user.model';

@Component({
  selector: '[app-user-list-table-row]',
  imports: [AngularSvgIconModule, NgClass],
  templateUrl: 'user-list-table-row.component.html',
  host: { class: 'py-4'}
})
export class UserListTableRowComponent {
  user= input.required<User>();

}
