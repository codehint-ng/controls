import {Tab} from './tab';

export class Tabs {
  private tabs: Tab[] = [];

  public add(tab: Tab) {
    this.tabs.push(tab);
    this._detectActive();
  }

  public unselectTabs() {
    this.tabs.forEach(tab => { tab.isActive = false; });
  }

  private _detectActive() {
    if (!this.tabs.some(tab => tab.isActive)) {
      if (this.tabs[0]) {
        this.tabs[0].isActive = true;
      }
    }
  }
}
