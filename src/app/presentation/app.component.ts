import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { ThemeService } from './core/services/theme.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster],
    templateUrl: './app.component.html',
    standalone: true,
})
export class AppComponent {
  title = 'coolfix-dashboard';

  constructor(public themeService: ThemeService) {}
}
