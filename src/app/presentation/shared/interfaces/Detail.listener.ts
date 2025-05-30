import { FormGroup } from "@angular/forms";

export interface DetailListener<T>{
  close : () => void;
  submit : (formGroup : FormGroup) => void;
  delete : (id : number | string  | T) => void;
  cancel : () => void;
}
