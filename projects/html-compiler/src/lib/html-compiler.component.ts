import {Compiler, Component, Input, NgModule, OnChanges, SimpleChanges, ViewContainerRef} from '@angular/core';
import {CommonModule} from '@angular/common';

// JitCompilerModule must be included once only in app.module
// using
// <app-html-compiler [template]="htmlText" [componentClass]="componentClass" [imports]="imports">
//  </app-html-compiler>


// htmlText = '';
// componentClass = {};
// this.htmlText = '<div>hello {{name}}</div> <button (click)="onEvent()">Test Event</button>';
// this.componentClass = {
//  name: 'World!',
//  onEvent: function() { alert('this is event'); }
// }

@Component({
  selector: 'cng-html-compiler',
  template: ''
})
export class CngHtmlCompilerComponent  implements OnChanges {
  @Input() template = '';
  @Input() componentClass: object = {};
  @Input() imports = [CommonModule];

  constructor(private compiler: Compiler, private container: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges) {
    let currentTemplate = this.template;
    if (changes.template) {
      currentTemplate = changes.template.currentValue;
    }
    let currentComponentClass = this.componentClass;
    if (changes.componentClass) {
      currentComponentClass = changes.componentClass.currentValue;
    }
    this.addComponent(currentTemplate, currentComponentClass);
  }

  private addComponent(template: string, properties: any = {}) {
    this.container.clear();

    // @Component({template})
    // class TemplateComponent {}
    // Component({template})(TemplateComponent);
    const TemplateComponent = Component({template})(class {});

    // @NgModule({declarations: [TemplateComponent], imports: [BrowserModule, CommonModule]})
    // class TemplateModule {}
    // NgModule({declarations: [TemplateComponent], entryComponents: [TemplateComponent], imports:
    // [BrowserModule, CommonModule]})(TemplateModule);
    const TemplateModule = NgModule({
      declarations: [TemplateComponent],
      entryComponents: [TemplateComponent],
      imports: []})(class {});

    const module = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    const factory = module.componentFactories.find((comp) =>
      comp.componentType === TemplateComponent
    );
    const component = this.container.createComponent(factory);
    Object.assign(component.instance, properties);
    if (component.instance.ngOnInit) {
      setTimeout(() => {
        component.instance.ngOnInit();
      }, 10);
    }
    // If properties are changed at a later stage, the change detection
    // may need to be triggered manually:
    // component.changeDetectorRef.detectChanges();
  }

  // outer functions, may be remade with store
  public getSourceHtml() {
    const viewRef: any /*ViewRef_*/ = this.container.get(0) as any /*ViewRef_*/;
    const ngComponent = viewRef.rootNodes[0];
    return ngComponent.innerHTML;
  }
}
