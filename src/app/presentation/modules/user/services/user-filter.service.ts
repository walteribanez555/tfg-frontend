import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserFilterService {
  searchField = signal<string>('');
  statusField = signal<string>('');
  orderField = signal<string>('');

  constructor() {}
}
