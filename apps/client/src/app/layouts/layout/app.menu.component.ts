import { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from 'src/app/features/auth';
import { Role } from 'src/app/core/models';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  standalone: true,
  imports: [NgFor, NgIf, AppMenuitemComponent],
})
export class AppMenuComponent implements OnInit {
  layoutService = inject(LayoutService);
  authService = inject(AuthService);

  model: any[] = [];

  ngOnInit() {
    const userRole = this.authService.getUserRole();
    this.model = [
      {
        label: 'Home',
        visible: this.authService.isAuthorized(userRole, [
          Role.USER,
          Role.ADMIN,
        ]),
        items: [
          {
            label: 'Dashboard',
            icon: PrimeIcons.HOME,
            routerLink: ['/'],
          },
        ],
      },
      {
        label: 'Admin',
        visible: this.authService.isAuthorized(userRole, [Role.ADMIN]),
        items: [
          {
            label: 'Admin',
            icon: PrimeIcons.COG,
            routerLink: ['/admin'],
          },
        ],
      },
      {
        label: 'Alerts',
        visible: this.authService.isAuthorized(userRole, [
          Role.ADMIN,
          Role.USER,
        ]),
        items: [
          {
            label: 'Alerts',
            icon: PrimeIcons.COG,
            routerLink: ['/alerts'],
          },
        ],
      },
      // {
      //   label: 'Users',
      //   visible: this.authService.isAuthorized(userRole, [
      //     Role.ADMIN,
      //     Role.USER,
      //   ]),
      //   items: [
      //     {
      //       label: 'Users',
      //       icon: PrimeIcons.USERS,
      //       routerLink: ['/users'],
      //     },
      //     {
      //       label: 'Create user',
      //       icon: PrimeIcons.USER_PLUS,
      //       routerLink: ['/users/create'],
      //       visible: this.authService.isAuthorized(userRole, [Role.ADMIN]),
      //     },
      //   ],
      // },
    ];
  }
}
