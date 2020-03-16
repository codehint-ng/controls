import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodehintNgTabsComponent } from './codehint-ng-tabs.component';

describe('CodehintNgTabsComponent', () => {
  let component: CodehintNgTabsComponent;
  let fixture: ComponentFixture<CodehintNgTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodehintNgTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodehintNgTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
