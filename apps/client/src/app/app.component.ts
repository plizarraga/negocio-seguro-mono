import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';
export interface Event {
  id: number;
  deviceId: string;
  eventType: string;
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
  events: Event[] = [];

  constructor(private socket: Socket) {}

  ngOnInit(): void {
    this.http.get<Event[]>('/api/events').subscribe((res) => {
      console.log(res);
      this.events = res;
    });
    this.getCreatedEvent();
  }

  getCreatedEvent() {
    return this.socket.fromEvent<Event>('event_created').subscribe((data) => {
      console.log(data);
      this.events.unshift(data);
    });
  }
}
