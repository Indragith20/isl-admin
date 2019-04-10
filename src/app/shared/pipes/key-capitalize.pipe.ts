import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'keycapitalize'
})
@Injectable()
export class KeyCapitalize implements PipeTransform {

    transform(value, args: string[]): any {
        if (value) {
            const splitArray = value.split('_');
            return `${splitArray[0] ? `${splitArray[0].charAt(0).toUpperCase()}${splitArray[0].slice(1)}` : ''}
                 ${splitArray[1] ? `${splitArray[1].charAt(0).toUpperCase()}${splitArray[1].slice(1)}` : ''}`;
        }
        return '';
    }
}
