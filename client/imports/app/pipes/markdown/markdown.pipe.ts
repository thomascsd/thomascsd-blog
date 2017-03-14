import { MarkdownService } from './markdown.service';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const service = new MarkdownService();
    const html = service.toHtml(value);
    return html;
  }

}