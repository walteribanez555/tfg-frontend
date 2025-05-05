import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

    /*List of students */
    students: Student[] = [
      {
        id: '19945739-eb83-4a35-ae25-c4942971c7d5',
        name: 'Alice Castillo',
      },
      {
        id: '33612d7f-79f0-4992-8424-c931b0c05aa5',
        name: 'Carla Mendoza',
      },
      {
        id: '5742ef9d-a8d7-4578-895f-9b7147882d6d',
        name: 'Elena Vega',
      },
      {
        id: '5fd21455-f584-4f60-b80a-937151539b8a',
        name: 'David Rojas',
      },
      {
        id: '62bd297c-6ba0-42c1-96c8-c3b5a49489b2',
        name: 'Bruno López',
      },
    ];



  constructor() { }



  /**
   * Get the list of students
   * @returns {Student[]} List of students
   */
  getStudents() {
    return this.students;
  }

}
