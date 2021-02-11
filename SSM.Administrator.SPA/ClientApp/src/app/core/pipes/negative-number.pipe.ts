import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'negativeNumber'})
export class NegativeNumberPipe implements PipeTransform {
  
  transform(text: string) {
    if (text && text.indexOf('-') > -1) {
      var span = '<span class="negative-value">#</span>';
      var newFormat = span.replace(/#/g, text);
      return newFormat;
    } else {
      return text;
    }
  }
}
