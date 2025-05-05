import { Injectable } from '@angular/core';
import { Scolarship } from '../models/tutor.model';

@Injectable({
  providedIn: 'root'
})
export class ScolarshipService {

  /*List of tutors */
  tutor: Scolarship[] = [
    {
      id: '8b0e6edd-c690-4c6a-bd7c-2adb7e549eac',
      name: 'Prof. Diego Fernández',
    },
    {
      id: '96be4d2b-dbb0-4c5d-91c4-52d5616e4b07',
      name: 'Prof. Laura Méndez',
    },
    {
      id: 'cd36068c-48c8-4dd2-b1be-ed79e1361c51',
      name: 'Prof. Silvia Torres',
    },
  ];

  constructor() { }


  /**
   * Get the list of tutors
   * @returns {Scolarship[]} List of tutors
   */
  getScolarship() {
    return this.tutor;
  }

}
