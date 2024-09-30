import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cep'
})
export class CepPipe implements PipeTransform {

    transform(value: string): string {

        if (!value) {
            return '';
        }

        let newValue = value.replace(/\D/g, '') || '';

        if (newValue.length === 8) {
            newValue = newValue.replace(/(\d{5})(\d{3})/g, '\$1-\$2');
        }

        return newValue;

    }

}
