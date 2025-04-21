import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { QuantityComponent } from '../quantity/quantity.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { ListQuantityInterface } from './interfaces/list-quantity.interface';
import { ItemQuantity } from './interfaces/item-quantity.interface';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-list-quantity',
  standalone: true,
  imports: [
    CommonModule,
    QuantityComponent,
    SvgIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListQuantityComponent),
      multi: true,
    },
  ],
  templateUrl: './list-quantity.component.html',
})
export class ListQuantityComponent implements OnInit {
  ngOnInit(): void {
    this.listQuantityInterfaceEvent.emit(this.listQuantityInterface);
  }

  @Output() listQuantityInterfaceEvent = new EventEmitter();


  itemsQuantity: ItemQuantity[] = [];
  formsQuantity: FormControl[] = [];

  value: any;

  listQuantityInterface: ListQuantityInterface<ItemQuantity> = {
    onAddItem: (i: ItemQuantity) => {
      console.log(i);

      const existOnList = this.itemsQuantity.some((item) => item.id == i.id);

      if (!existOnList) {
        const formControl = new FormControl();

        formControl.valueChanges.subscribe({
          next: () => {
            const valueUpdated = this.formsQuantity.map((form) => form.value);
            this.changeValue(valueUpdated);
          },
        });

        this.formsQuantity.push(formControl);
        this.itemsQuantity.push(i);
      }
    },

    onReset : ( ) => {
      this.itemsQuantity = [];
      this.formsQuantity = [];
    }
  };

  onRemoveItemOnList(pos: number) {
    this.itemsQuantity.splice(pos, 1);
    this.formsQuantity.splice(pos, 1);

    const valueUpdated = this.formsQuantity.map((form) => form.value);
    this.changeValue(valueUpdated);
  }

  onChange?: (v: any) => void;
  onTouched?: () => void;

  isDisabled = false;

  private cdr = inject(ChangeDetectorRef);

  writeValue(value: any): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  changeValue(value: any): void {
    this.value = value;
    this.onTouched?.();
    this.onChange?.(value);
  }
}
