import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-html-compiler',
  templateUrl: './html-compiler.component.html',
  styleUrls: ['./html-compiler.component.scss']
})
export class HtmlCompilerComponent implements OnInit {
  template: string;
  componentClass: object;
  imports = [];

  constructor() {}

  ngOnInit(): void {
    this.template = '<div>hello {{name}}</div> <button (click)="onEvent()">Test Event</button>';
    this.componentClass = {
      name: 'World!',
      onEvent: () => { alert('this is event'); }
    };
  }
}
