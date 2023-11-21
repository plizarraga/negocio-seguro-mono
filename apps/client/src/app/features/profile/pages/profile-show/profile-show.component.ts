import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-user-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-show.component.html',
})
export class ProfileShowComponent implements OnInit {
  public user$!: Observable<User | null>;
  private _authService = inject(AuthService);

  ngOnInit() {
    this.user$ = this._authService.currentUser$;
  }
}
