import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Pipe({
   name: 'keyobject'
})
@Injectable()
export class Keyobject implements PipeTransform {

transform(value, args:string[]):any {
    let keys = [];
    for (let key in value) {
        keys.push({key: key, value: value[key]});
    }
    return keys;
}}
