import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemList } from '../item-list/interfaces/ItemList.interfaces';

@Component({
  selector: 'app-list-tags',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl : './list-tags.component.html',

})
export class ListTagsComponent {



  @Input() tags!: ItemList[];

  @Output() onRemoveTag = new EventEmitter();




  onRemove( indexItem : number){
    const itemDeleted = this.tags.splice(indexItem, 1);
    this.onRemoveTag.emit(itemDeleted);
  }






}
