import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MessageState} from './message-handler.model';

@Injectable()

/*
* Service to show and hide messages from service
*/
export class MessageService {

  private messageSubject = new Subject<MessageState>();
  MessageState = this.messageSubject.asObservable();

  /**
   * @class NapoMessageService
   * @constructor
   */
  constructor() {
  }

  /** For passing message and message type to component
   * @class NapoMessageService
   * @method showMessage
   * @param response
   * @param type
   */
  showMessage(response: any, type: string): void {
    this.messageSubject.next(<MessageState>{message: response, messageType: type});
  }

  /** For passing blank message to indicate hiding of message
   * @class NapoMessageService
   * @method hideMessage
   */
  hideMessage(): void {
    this.messageSubject.next(<MessageState>{message: ''});
  }
}
