import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';

@Directive({
  selector: '[appResizableTableColumn]'
})
export class ResizableTableColumnDirective implements OnInit, OnDestroy {
  @Input() appResizableTableColumn: boolean;
  private resizer = new Resizer();

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    if (this.appResizableTableColumn || this.appResizableTableColumn as any === '') {
      const resizeDiv = Helper.createResizeDiv(this.elementRef.nativeElement);
      this.resizer.attachEvents(resizeDiv);
    }
  }

  ngOnDestroy() {
    this.resizer.detachEvents();
  }
}

class Resizer {
  private pageX;
  private curCol;
  private nxtCol;
  private curColWidth;
  private nxtColWidth;
  private resizeDiv;

  attachEvents(resizeDiv) {
    this.resizeDiv = resizeDiv;
    this.resizeDiv.addEventListener('mousedown', this.resizeDivMouseDown.bind(this));
    document.addEventListener('mousemove', this.documentMouseMove.bind(this));
    document.addEventListener('mouseup', this.documentMouseUp.bind(this));
  }

  detachEvents() {
    if (this.resizeDiv) {
      this.resizeDiv.removeEventListener('mousedown', this.resizeDivMouseDown.bind(this));
      document.removeEventListener('mousemove', this.documentMouseMove.bind(this));
      document.removeEventListener('mouseup', this.documentMouseUp.bind(this));
    }
  }

  private resizeDivMouseDown(e) {
    this.curCol = e.target.parentElement;
    this.nxtCol = this.curCol.nextElementSibling;
    this.pageX = e.pageX;
    this.curColWidth = this.curCol.offsetWidth;
    if (this.nxtCol) {
      this.nxtColWidth = this.nxtCol.offsetWidth;
    }
  }

  private documentMouseMove(e) {
    if (this.curCol) {
      const diffX = e.pageX - this.pageX;
      if (this.nxtCol) {
        this.nxtCol.style.width = (this.nxtColWidth - (diffX)) + 'px';
      }
      this.curCol.style.width = (this.curColWidth + diffX) + 'px';
    }
  }

  private documentMouseUp(e) {
    this.curCol = undefined;
    this.nxtCol = undefined;
    this.pageX = undefined;
    this.nxtColWidth = undefined;
    this.curColWidth = undefined;
  }
}

class Helper {
  static createResizeDiv(thElement) {
    const div = this.createDiv(thElement.offsetHeight);
    thElement.appendChild(div);
    // thElement.style.position = 'relative';
    return div;
  }

  private static createDiv(height) {
    const div = document.createElement('div');
    div.style.top = '0';
    div.style.right = '0';
    div.style.width = '4px';
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    /* remove backGroundColor later */
    div.style.backgroundColor = '#f2f2f2';
    div.style.opacity = '0.2';
    div.style.userSelect = 'none';
    /* table height */
    div.style.height = height + 'px';
    div.classList.add('col-resize');
    return div;
  }
}
