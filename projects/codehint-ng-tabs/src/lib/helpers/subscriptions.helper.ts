import {Subscription} from 'rxjs';

export interface Subscriptions {
  [key: string]: Subscription;
}

export class SubscriptionsHelper {
  static unsubscribe(subscriptions: Subscriptions) {
    Object.keys(subscriptions).forEach(key => {
      if (subscriptions[key]) {
        subscriptions[key].unsubscribe();
        delete subscriptions[key];
      }
    });
  }
}
