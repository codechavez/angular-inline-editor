import {PipeTransform, Pipe, ViewEncapsulation} from '@angular/core';

@Pipe({ name: 'highlight' })
export class HighLightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    debugger;
    return search ? text.replace(new RegExp(search, 'i'), `<span class="txt-light">${search}</span>`) : text;
  }
}
