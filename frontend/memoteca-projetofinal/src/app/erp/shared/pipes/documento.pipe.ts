import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'documento'
})
export class DocumentoPipe implements PipeTransform {

    transform(value: string): string {

        if (!value) {
            return '';
        }

        let newValue = value.replace(/\D/g, '');

        if (newValue.length === 11) {
            newValue = newValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
        } else if (newValue.length === 14) {
            newValue = newValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
        } else {
            newValue = value;
        }

        return newValue;

    }

}
