import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input-quantity',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl : './input-quantity.component.html',

})
export class InputQuantityComponent { }
