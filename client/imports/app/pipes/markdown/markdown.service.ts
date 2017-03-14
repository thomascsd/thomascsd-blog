import { Injectable } from '@angular/core';
import * as showdown from 'showdown';

@Injectable()
export class MarkdownService {

    constructor() { }

    toHtml(text: string): string {
        const converter = new showdown.Converter();
        return converter.makeHtml(text);
    }

}
