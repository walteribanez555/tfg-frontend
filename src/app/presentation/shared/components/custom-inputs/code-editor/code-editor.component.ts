import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule,
  ],
  providers : [
    {
      provide : NG_VALUE_ACCESSOR,
      useExisting : forwardRef(() => CodeEditorComponent),
      multi : true
    }
  ],
  templateUrl : 'code-editor.component.html',
})
export class CodeEditorComponent implements ControlValueAccessor, OnInit{

  ngOnInit(): void {

  }


  onChange? : ( v : string) => void;
  onTouched?: () => void;

  idDisabled = false;
  private cdr = inject(ChangeDetectorRef);



  writeValue( text : string | null) : void {
    this.value = text || '';

    this.cdr.markForCheck();
  }


  registerOnChange(fn: ( v : string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
      this.idDisabled = isDisabled;
  }

  changeValue( value : string) : void{
    this.value = value;
    this.onTouched?.();
    this.onChange?.(value);
    this.cdr.detectChanges();
  }








  editorOptions = {
    theme: 'vs-dark',
    language: 'json',
    wordWrap: 'on',
    // https://github.com/atularen/ngx-monaco-editor/issues/19
    automaticLayout: true,
  };

  value : string = '{\n  "presentation" : "demo"\n}';



  onChangeModel(event : string) {
    this.changeValue(event);
  }

}
