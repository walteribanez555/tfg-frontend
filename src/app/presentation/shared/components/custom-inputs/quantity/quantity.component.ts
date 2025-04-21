import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-quantity',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers : [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting : forwardRef(() => QuantityComponent),
      multi : true
    }
  ],
  templateUrl : './quantity.component.html',
})
export class QuantityComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }


  onChange? : ( v:  number) => void;
  onTouched? : () => void;

  isDisabled = false;

  private cdr = inject(ChangeDetectorRef);

  @Input()name : string = "item";
  @Input()id : number = 0;
  value : any;
  amount? : number;


  writeValue( value : any) : void{
    this.value = value;
    this.cdr.markForCheck();
  }


  registerOnChange( fn : any) : void {
    this.onChange = fn;
  }

  registerOnTouched( fn : any) : void {
    this.onTouched = fn;
  }


  setDisabledState?(isDisabled  : boolean) : void{
    this.isDisabled = isDisabled;
  }

  changeValue( value : any) : void{
    this.value = value;
    this.onTouched?.();
    this.onChange?.(value);
  }

  onChangeFromInput( value : number) {


    this.changeValue({
      id : this.id,
      amount : value
    });

  }

}
