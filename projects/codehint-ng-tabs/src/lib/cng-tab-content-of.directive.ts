import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {CngTabComponent} from './tab/cng-tab.component';
import {Subscriptions, SubscriptionsHelper} from './helpers/subscriptions.helper';

@Directive({
  selector: '[cngTabContentOf]'
})
export class CngTabContentOfDirective implements OnInit, OnDestroy {
  @Input() cngTabContentOf: CngTabComponent;

  private subs: Subscriptions = {};

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.subs.IsActive = this.cngTabContentOf.tab.isActive$.subscribe(isActive => {
      const display = isActive ? 'block' : 'none';
      this.renderer.setStyle(this.element.nativeElement, 'display', display);
    });
  }

  ngOnDestroy() {
    SubscriptionsHelper.unsubscribe(this.subs);
  }
}
