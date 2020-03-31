# @codehint-ng/html-compiler

A simple component to display dynamic Angular components.

## Usage

**!!!NOTE** For production version see note below.

1) Register the @codehint-ng/html-compiler in your module:

        import { CngHtmlCompilerModule } from '@codehint-ng/html-compiler';

        @NgModule({
        imports: [
            CngHtmlCompilerModule
            ...
        ],
        ...

2) Define dynamic component (angular syntax):

       this.template = '<div>hello {{name}}</div> <button (click)="onEvent()">Test Event</button>';
       this.componentClass = {
           name: 'World!',
           onEvent: () => { alert('this is event'); }
        };

3) Use cng-html-compiler to display dynamic component:
           
       <cng-html-compiler [template]="template"
                          [componentClass]="componentClass">
       </cng-html-compiler>
  
**!!!NOTE**
To work correctly application in production, do not forget to register JitCompilerModule in your main app.module.

    import { JitCompilerModule } from '@codehint-ng/html-compiler';
            
     @NgModule({
         imports: [
             // workaround: The issue: Runtime compiler is not loaded.   
             JitCompilerModule // !once only, !in main app.module only
                 ...
          ],
          ...
      })
      export class AppModule { }    

**Addition**
1) If you want to place in template string some Angular component (your own or third party) 
you need to add origin module into property imports component cng-html-compiler 
       
       this.template = '<my-or-third-party-component ...></my-or-third-party-component>';
       this.componentClass = {...};
       this.imports = [MyOrThirtPartyModule];
       ...
       
And pass this parameter into cng-html-compiler:     
              
       <cng-html-compiler [template]="template"
                          [componentClass]="componentClass"
                          [imports]="imports">
       </cng-html-compiler>
       
2) Html Compiler allows to get rendered html also:
        
       @ViewChild(CngHtmlCompilerComponent, {static: true}) htmlCompilerComponent: CngHtmlCompilerComponent;
       
       const sourceHtml = this.htmlCompilerComponent.getSourceHtml();
