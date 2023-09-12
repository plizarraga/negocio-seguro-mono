import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  title = 'client';

  ngOnInit(): void {
    this.http.get('/api').subscribe((res) => console.log(res));
  }
}
