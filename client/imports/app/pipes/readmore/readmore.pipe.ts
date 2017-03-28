import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readmore'
})
export class ReadmorePipe implements PipeTransform {

  transform(value: string, args?: number): string {
    if (value && value.length > args) {
      value = value.substr(0, 200) + '......Read More';
    }

    return value;
  }

}