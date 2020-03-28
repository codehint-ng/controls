import {BehaviorSubject} from 'rxjs';

export class Tab {
  // tslint:disable-next-line:variable-name
  private _isActive$ = new BehaviorSubject<boolean>(false);
  get isActive$() { return this._isActive$; }
  get isActive() { return this.isActive$.getValue(); }
  set isActive(val: boolean) { this._isActive$.next(val); }
}
