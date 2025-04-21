import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-user-list-table-footer',
  imports: [AngularSvgIconModule],
  templateUrl: 'user-list-table-footer.component.html',
})
export class UserListTableFooterComponent { }
