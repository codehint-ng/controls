import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appNumberToArray'
})
export class NumberToArrayPipe implements PipeTransform {
  transform(value: number): any[] {
    return new Array(value);
  }
}
