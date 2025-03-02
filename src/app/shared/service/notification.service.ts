import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { notifydataEnum } from './notify-types';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  private eventChannels = {};
  private subscriptions$: Subscription[] = [];

  public sendEvent<T>(eventName: notifydataEnum, data: T) {
    this.registerEvent<T>(eventName);
    (this.eventChannels[eventName] as BehaviorSubject<T>).next(data);
  }

  public subscribeEvent<T>(eventName: notifydataEnum, cb: (data: T) => any): Subscription {
    this.registerEvent<T>(eventName);
    let subscribe = this.eventChannels[eventName].asObservable();
    this.subscriptions$.push(subscribe);
    return subscribe.subscribe(cb);
  }

  ngOnDestroy() {
    // _.forEach(this.eventChannels, (name, subject) => subject.complete());
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  private registerEvent<T>(eventName: notifydataEnum) {
    if (!(eventName in this.eventChannels)) {
      this.eventChannels[eventName] = new BehaviorSubject('');
    }
  }
}
