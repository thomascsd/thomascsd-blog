import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'read-more'
})
export class ReadMorePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}