import { Component, inject } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
  standalone: true,
})
export class AppFooterComponent {
  createdBy = environment.CREATED_BY;
  layoutService = inject(LayoutService);
}
