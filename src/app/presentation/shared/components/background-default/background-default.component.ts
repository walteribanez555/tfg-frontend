import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-background-default',
  imports: [RouterModule],
  template: `<div  class="bg-background h-[100vh]" >
    <router-outlet></router-outlet>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundDefaultComponent { }
