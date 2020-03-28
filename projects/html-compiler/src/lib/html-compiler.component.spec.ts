import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CngHtmlCompilerComponent } from './html-compiler.component';

describe('HtmlCompilerComponent', () => {
  let component: CngHtmlCompilerComponent;
  let fixture: ComponentFixture<CngHtmlCompilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CngHtmlCompilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CngHtmlCompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
