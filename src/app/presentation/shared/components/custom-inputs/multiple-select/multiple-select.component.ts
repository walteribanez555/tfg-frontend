import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { SelectComponent } from '../select/select.component';
import { ItemList } from '../../item-list/interfaces/ItemList.interfaces';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ListTagsComponent } from '../../list-tags/list-tags.component';

@Component({
  selector: 'app-multiple-select',
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    ListTagsComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './multiple-select.component.html',
})
export class MultipleSelectComponent implements ControlValueAccessor, OnInit {
  onChange?: (v: string) => void;
  onTouched?: () => void;

  selectedList: ItemList[] = [];

  value : string | null = null;
  isDisabled = false;

  @Input() items!: ItemList[];
  @Input() withFilter: boolean = false;

  private cdr = inject(ChangeDetectorRef);

  writeValue(items: string): void {

    if (!items) {
      return;
    }

    this.selectedList = items
      .split(',')
      .map(
        (i) => this.items.find((item) => item.id == parseInt(i)) as ItemList
      );
    this.value = items;

    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisableState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  changeValue(value: string): void {
    this.value = value;
    this.onTouched?.();
    this.onChange?.(value);
    this.cdr.markForCheck();

  }

  ngOnInit(): void {}

  onSelectedItem(item: number) {
    if (this.selectedList.find((i) => i.id == item)) {
      return;
    }

    this.selectedList.push(this.items.find((i) => i.id == item) as ItemList);


    this.changeValue(this.selectedList.map((i) => i.id).join(','));
  }

  onRemoveTag(item: ItemList) {
    this.selectedList = this.selectedList.filter((tag) => tag.id !== item.id);

    this.changeValue(this.selectedList.map((i) => i.id).join(','));
  }
}
