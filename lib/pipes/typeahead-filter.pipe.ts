import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'typeaheadfilter',
  pure: false

})
@Injectable()
export class typeaheadfilter implements PipeTransform {
    transform(items: any[], filter: string, displayValue: string): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item[displayValue].toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}