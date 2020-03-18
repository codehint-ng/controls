import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CngTabsComponent } from './cng-tabs.component';

describe('CodehintNgTabsComponent', () => {
  let component: CngTabsComponent;
  let fixture: ComponentFixture<CngTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CngTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CngTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
