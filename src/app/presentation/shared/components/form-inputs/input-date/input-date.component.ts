import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validator } from '@angular/forms';
import { CustomInput } from '../CustomInput.interface';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl : './input-date.component.html',

})
export class InputDateComponent implements CustomInput {

  @Input()  formControl!: FormControl<any>;
  @Input()  data: any;
  @Input()  validators : Validator[] = [];

 }
