import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/features/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  standalone: true,
  imports: [RouterLink, NgClass],
})
export class AppTopBarComponent {
  title = environment.APP_NAME;
  items!: MenuItem[];

  layoutService = inject(LayoutService);
  authService = inject(AuthService);

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  logOut() {
    this.authService.signOut();
  }
}
