import {Directive, ElementRef, Injectable, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appCustomBackground]'
})
export class CustomBackgroundDirective implements OnInit {
  @Input() appCustomBackground = 'none';

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.appCustomBackground);
  }
}
