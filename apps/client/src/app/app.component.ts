import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
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
