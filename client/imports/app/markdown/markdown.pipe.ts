import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}