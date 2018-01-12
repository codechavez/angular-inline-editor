import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'displayFieldName',
  pure: false

})
@Injectable()
export class DisplayFieldNameFilter implements PipeTransform {
    transform(item: any, displayValue: string): any {
        if (item == null || item == undefined || displayValue == "" || displayValue == null || displayValue == undefined) {
            return null;
        }

        return item[displayValue];
    }
}