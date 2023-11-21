import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../alerts.service';
import { Socket } from 'ngx-socket-io';
import { Alert } from '../../models/alert.model';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-alerts-list',
  standalone: true,
  imports: [CommonModule],
  providers: [AlertsService],
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-10px)' }),
            stagger(100, [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
        query(
          ':leave',
          [
            animate(
              '300ms ease-out',
              style({ opacity: 0, transform: 'translateY(-10px)' }),
            ),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class AlertsListComponent implements OnInit {
  private alertsService = inject(AlertsService);
  private socket = inject(Socket);

  alerts: Alert[] = [];

  ngOnInit(): void {
    this.alertsService.getAll().subscribe((alerts) => {
      this.alerts = alerts;
    });
    this.getCreatedEvent();
  }

  getCreatedEvent() {
    return this.socket.fromEvent<any>('alert_created').subscribe((data) => {
      console.log(data);
      this.alerts.unshift(data);
    });
  }
}
