import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-table-footer',
  imports: [AngularSvgIconModule],
  templateUrl: './table-footer.component.html',
  styleUrl: './table-footer.component.css',
  standalone: true,
})
export class TableFooterComponent {}
