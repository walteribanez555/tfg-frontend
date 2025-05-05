import { Injectable } from '@angular/core';
import { ItemList } from 'src/app/presentation/shared/components/item-list/interfaces/ItemList.interfaces';
import { ListView } from 'src/app/presentation/shared/components/listview/interfaces/ListView';

@Injectable({
  providedIn: 'root'
})
export class StateTfgService {

  constructor() { }

  states : ItemList[] = [
    {
      id: 1,
      name: 'In Review',
    },
    {
      id: 2,
      name: 'Approved',
    }
    ,
    {
      id: 3,
      name: 'Rejected',
    },
    {
      id: 4,
      name: 'In Progress',
    },
    {
      id: 5,
      name: 'Completed',
    }
  ]

  /**
   * Get the list of states
   * @returns {ItemList[]} List of states
   */
  getStates(): ItemList[] {
    return this.states;
  }
}
