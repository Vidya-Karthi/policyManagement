import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IspHttpResponseHandlerService {
  private loadingServiceCount = 0;
  constructor() { }


  /**
   * Global http success handler
   * @param response
   * */
  public onSuccess(response: any): void {
    this.hideLoader();
  }

    /**
   * Global http error handler.
   *
   * @param error
   * @param source
   * @returns {ErrorObservable}
   */
  public onCatch(response: any, source: Observable<any>): Observable<any> {
    //let errMsg = response.status + ' ' + response.statusText;
    switch (response.status) {
      case 400:
        //errMsg = response.error[0].message;
        this.handleBadRequest(response);
        break;

      case 401:
        this.handleUnauthorized(response);
        break;

      case 403:
        this.handleForbidden(response);
        break;

      case 404:
        this.handleNotFound(response);
        break;

      case 500:
        this.hideLoader();
        this.handleServerError(response);
        break;

      default:
        this.handleDefaultError(response);
        break;
    }
    this.hideLoader();
    // this.commonService.setServiceErrorList(response.message);
    // this.alertService.show({'type': 'danger', 'msg': errMsg});
    return Observable.create();
  }


  /**
   * Shows notification errors when server response status is 400
   *
   * @param error
   */
  private handleBadRequest(responseBody: any): void {
    if (responseBody._body) {
      try {
        const bodyParsed = responseBody.json();
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        this.handleServerError(error);
      }
    } else {
      this.handleServerError(responseBody.error);
    }
  }

  /**
   * Shows notification errors when server response status is 401 and redirects user to login page
   *
   * @param responseBody
   */
  private handleUnauthorized(response: any): void {
   console.error('isp-http', 'handleUnauthorized', '401 Error', response, response.error);
  }

  /**
   * Shows notification errors when server response status is 403
   */
  private handleForbidden(response: any): void {
    console.error('isp-http', 'handleForbidden', '403 Error', response, response.error);
    // this.router.navigate(['/login']);
  }

  /**
   * Shows notification errors when server response status is 404
   *
   * @param responseBody
   */
  private handleNotFound(response: any): void {
    console.error('isp-http', 'handleNotFound', '404 Error', response, response.error);
  }
  /**
   * Parses server response and shows notification errors with translated messages
   *
   * @param response
   */
  private handleErrorMessages(response: any): void {
    console.error('isp-http', 'handleErrorMessages', '400 Error', response, response.error());
  }

  /**
   * Shows notification errors when there is a default error
   *
   * @param response
   */
  private handleDefaultError(response: any): void {
    console.error('isp-http', 'handleDefaultError', 'Default Error', response, response.error);
  }
  /**
   * Shows notification errors when server response status is 500
   */
  private handleServerError(response: any): void {
    console.error('isp-http', 'handleServerError', 'Server Error', response, response.error);
  }


  /**
 * showLoader()
 */
  public showLoader(): void {
    this.loadingServiceCount++;
  }

  /**
   * hideLoader()
   */
  public hideLoader(): void {
    if (this.loadingServiceCount <= 1) {
    }
    this.loadingServiceCount--;
  }

}
