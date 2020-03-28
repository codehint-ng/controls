import {Compiler, COMPILER_OPTIONS, CompilerFactory, NgModule} from '@angular/core';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';

// !!! MUST be included in main module only, once only (issue: Runtime compiler is not loaded)
export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] }
  ]
})
export class JitCompilerModule { }
