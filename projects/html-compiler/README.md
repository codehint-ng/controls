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
The issue: Runtime compiler is not loaded. 
Register the @codehint-ng/html-compiler in your module:

    import { JitCompilerModule } from '@codehint-ng/html-compiler';
            
     @NgModule({
         imports: [
             JitCompilerModule // !once only, !in main app.module only
                 ...
          ],
          ...
      })
      export class AppModule { }    
