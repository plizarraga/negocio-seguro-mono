import { Injectable, inject } from '@angular/core';
import { HttpApiService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';
import { Alert } from './models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private API_URL = environment.API_URL;
  private apiService = inject(HttpApiService);
  getAll() {
    return this.apiService.get<Alert[]>(`${this.API_URL}/api/alerts`);
  }
}
