import {Component, ElementRef, OnInit} from '@angular/core';
import {Tabs} from './helpers/tabs';

@Component({
  selector: 'cng-tabs',
  template: '<ng-content></ng-content>'
})
export class CngTabsComponent implements OnInit {
  tabs: Tabs;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.tabs = new Tabs();
    this.element.nativeElement.tabsModuleGetTabs = () => this.tabs;
  }
}

