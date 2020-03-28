import {Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Tabs} from '../helpers/tabs';
import {Tab} from '../helpers/tab';
import {Subscriptions, SubscriptionsHelper} from '../helpers/subscriptions.helper';

@Component({
  selector: 'cng-tab',
  templateUrl: './cng-tab.component.html',
  styleUrls: ['./cng-tab.component.scss']
})
export class CngTabComponent implements OnInit, OnDestroy {
  private subs: Subscriptions = {};
  private tabs: Tabs;
  tab: Tab;

  constructor(private element: ElementRef) {}

  @HostBinding('class.active') activeTab = false;

  ngOnInit() {
    this.tabs = TabsHelper.getTabs(this.element.nativeElement);
    this.tab = new Tab();
    this.tabs.add(this.tab);
    this.subs.isActive = this.tab.isActive$.subscribe(isActive => {
      this.activeTab = isActive;
    });
  }

  ngOnDestroy() {
    SubscriptionsHelper.unsubscribe(this.subs);
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    this.tabs.unselectTabs();
    this.tab.isActive = true;
  }
}

class TabsHelper {
  public static getTabs(element): Tabs {
    const tabsElement = this.findAncestorByTagName(element, 'cng-tabs');
    if (!tabsElement) {
      throw new Error('Parent component cng-tabs not found!');
    }
    return tabsElement.tabsModuleGetTabs();
  }

  private static findAncestorByTagName(element, tagName) {
    tagName = tagName.toUpperCase();
    // tslint:disable-next-line:no-conditional-assignment
    while ((element = element.parentElement) && element.tagName !== tagName) {}
    return element;
  }
}
