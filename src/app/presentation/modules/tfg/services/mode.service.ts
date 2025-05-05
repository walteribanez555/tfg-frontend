import { Injectable } from '@angular/core';
import { Mode } from '../models/mode.model';

@Injectable({
  providedIn: 'root'
})
export class ModeService {


  /*List of modes */
  modes: Mode[] = [
    {
      id :'586bbe84-3fa8-416b-9de3-d19e6a9a6512',
      name: 'Virtual',
      description: 'Proceeding held via video conference'
    },
    {
      id :'706054bf-8bc9-4484-921f-6a863bb67abe',
      name: 'Escrito',
      description: 'Proceeding documented in writing'
    },
    {
      id :'c368beab-8510-48b0-8b2c-0b09b86c444d',
      name: 'Oral',
      description: 'Hearing conducted verbally in court'
    }
  ]

  constructor() { }

  /**
   * Get the list of modes
   * @returns {Mode[]} List of modes
   */
  getModes() {
    return this.modes;
  }

}
