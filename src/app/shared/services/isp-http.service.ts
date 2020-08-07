import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IspHttpResponseHandlerService } from './isp-http-response-handler.service'

@Injectable({
  providedIn: 'root'
})
export class IspHttpService {
  private baseUrl = '';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  constructor(private http: HttpClient, private responseHandler: IspHttpResponseHandlerService) { }
  private showLoader(): void {
    // this.loaderService.show();
  }

  private hideLoader(): void {
    // this.loaderService.hide();
  }

  /**
    * Set  HTTP Headers
    */
  /*
 private setHeaders(): Headers {
   const headersConfig = {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
     'Cache-Control': 'no-cache',
     'Pragma': 'no-cache',
     'Expires': 'Sat, 01 jan 2000 00:00:00 GMT'
   };

   return new Headers(headersConfig);
 }*/

  /**
     * GET method requests a resource from the server along with query parameters if required
     * @param path
     * @param params
     */
  /*get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    this.showLoader();
    const timeStart: number = performance.now();
    return this.http.get(`${this.baseUrl}${path}`, options:{ headers: this.setHeaders(), search: params })
      .catch((err, source) => this.responseHandler.onCatch(err, source))
      .map((res: Response) => this.responseHandler.onSuccess(res, timeStart));
  } */
  getConfig(path: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${path}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Set  HTTP Headers
   */
  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return new HttpHeaders(headersConfig);
  }


  /**
   * GET method requests a resource from the server along with query parameters if required
   * @param path
   * @param params
   */
  public get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T | any> {
    this.responseHandler.showLoader();
    return this.http
      .get(`${this.baseUrl}${path}`, {
        headers: this.setHeaders(),
        params: params
      })
      .pipe(
        tap(res => this.responseHandler.onSuccess(res)),
        catchError((err, source) => this.responseHandler.onCatch(err, source))
      );
  }

  /**
   * Utility method for Create.
   * @param path
   * @param params
   */
  public post<T, U>(path: string, body: T, resType = 'json'): Observable<U | any> {
    this.responseHandler.showLoader();
    return this.http
      .post(`${this.baseUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .pipe(
        tap(res => this.responseHandler.onSuccess(res)),
        catchError((err, source) => this.responseHandler.onCatch(err, source))
      )
  }

  /**
   * Utility method for Create.
   * @param path
   * @param params
   */
  public postForm<T, U>(path: string, body: T, resType = 'json'): Observable<U | any> {
    this.responseHandler.showLoader();
    return this.http
      .post(`${this.baseUrl}${path}`,(body), {
        headers: this.setFormHeaders()
      })
      .pipe(
        tap(res => this.responseHandler.onSuccess(res)),
        catchError((err, source) => this.responseHandler.onCatch(err, source))
      )
  }
  /**
   * Utility method for File Download.
   * @param path
   * @param params
   */
  public downloadUploadedFile<T, U>(path: string, body: T, resType = 'json'): Observable<U | any> {
    this.responseHandler.showLoader();
    return this.http
      .post(`${this.baseUrl}${path}`, (body), {
        headers: this.setFormHeaders(),
        responseType: 'blob'
      })
      .pipe(
        tap(res => this.responseHandler.onSuccess(res)),
        catchError((err, source) => this.responseHandler.onCatch(err, source))
      )
  }

  /**
   * Set  HTTP Headers
   */
  private setFormHeaders(): HttpHeaders {
    // const headersConfig = {
    //   'Content-Type': 'multipart/form-data',
    //   'Accept': 'application/json'
    // };
    return new HttpHeaders();
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
