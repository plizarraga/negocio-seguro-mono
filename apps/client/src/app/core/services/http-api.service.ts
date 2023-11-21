import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  private readonly http = inject(HttpClient);

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  get<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<T> {
    const allHeaders = this.mergeHeaders(headers);
    return this.http
      .get<T>(url, { headers: allHeaders, params })
      .pipe(catchError(this.handleError));
  }

  post<T>(
    url: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<T> {
    const allHeaders = this.mergeHeaders(headers);
    return this.http
      .post<T>(url, body, { headers: allHeaders, params })
      .pipe(catchError(this.handleError));
  }

  put<T>(
    url: string,
    body: any,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<T> {
    const allHeaders = this.mergeHeaders(headers);
    return this.http
      .put<T>(url, body, { headers: allHeaders, params })
      .pipe(catchError(this.handleError));
  }

  delete<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): Observable<T> {
    const allHeaders = this.mergeHeaders(headers);
    return this.http
      .delete<T>(url, { headers: allHeaders, params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      //error client
      errorMessage = error.error.message;
    } else {
      //error server
      // errorMessage = `${error.error.errors.detail}`;
      errorMessage = error.error.message;
    }

    return throwError(() => new Error(errorMessage));
  }

  private mergeHeaders(headers?: HttpHeaders): HttpHeaders {
    let mergedHeaders = this.defaultHeaders;
    if (headers) {
      headers.keys().forEach((key) => {
        mergedHeaders = mergedHeaders.set(key, headers.get(key) ?? '');
      });
    }
    return mergedHeaders;
  }
}
