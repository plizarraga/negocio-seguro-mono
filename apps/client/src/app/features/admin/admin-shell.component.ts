import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Admin works!</h1>`,
})
export class AdminShellComponent {}
