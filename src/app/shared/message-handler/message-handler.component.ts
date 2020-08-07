import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageService} from './message-handler.service';
import {MessageState} from './message-handler.model';

@Component({
  selector: 'app-message-handler',
  templateUrl: './message-handler.component.html',
  styleUrls: ['./message-handler.component.scss']
})
export class MessageHandlerComponent implements OnInit, OnDestroy {
  public errorMessage = '';
  private type: string = '';
  private subscription: Subscription;

  constructor(private messageService: MessageService, private zone: NgZone) { }

  ngOnInit() {
    this.subscription = this.messageService.MessageState
      .subscribe((state: MessageState) => {
        this.zone.run(() => {
          this.errorMessage = state.message;
          this.type = state.messageType;
        });
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
