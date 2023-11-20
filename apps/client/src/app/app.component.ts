import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  query,
  stagger,
} from '@angular/animations';
import { Socket } from 'ngx-socket-io';
export interface Alert {
  id: number;
  deviceId: string;
  alertType: string;
  batteryLevel: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  title = 'client';
  alerts: Alert[] = [];

  constructor(private socket: Socket) {}

  ngOnInit(): void {
    this.http.get<Alert[]>('/api/alerts').subscribe((res) => {
      console.log(res);
      this.alerts = res;
    });
    this.getCreatedEvent();
  }

  getCreatedEvent() {
    return this.socket.fromEvent<Alert>('alert_created').subscribe((data) => {
      console.log(data);
      this.alerts.unshift(data);
    });
  }
}
