import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TfgService } from '../../../services/tfg.service';

@Component({
  selector: 'app-tfg-list-header',
  imports: [],
  templateUrl: './tfg-list-header.component.html',
})
export class TfgListHeaderComponent {
  #tfgService = inject(TfgService);

  onAddToggle() {
    this.#tfgService.addTfg();
  }

  onGenerateReport() {
    this.#tfgService.generateTfgReport();
  }
 }
