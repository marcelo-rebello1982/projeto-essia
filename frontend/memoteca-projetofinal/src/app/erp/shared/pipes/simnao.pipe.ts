import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'simnao'
})
export class SimnaoPipe implements PipeTransform {

    transform(value: boolean): string {
        return value ? 'Sim' : 'Não';
    }

}
