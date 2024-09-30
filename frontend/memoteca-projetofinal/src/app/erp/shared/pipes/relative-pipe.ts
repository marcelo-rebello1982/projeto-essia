import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'relative',
})
export class RelativePipe extends DatePipe implements PipeTransform {

    transform(value: any): any {

        if (!value) {
            return '';
        }

        // const pattern = AppConfig.DATE_PATTERN;

        // const year: number = +value.replace(pattern, '$1');
        // const month: number = +value.replace(pattern, '$2') - 1;
        // const day: number = +value.replace(pattern, '$3');

        // const hours: number = +value.replace(pattern, '$4');
        // const minutes: number = +value.replace(pattern, '$5');
        // const seconds: number = +value.replace(pattern, '$6');

        // const date = new Date(year, month, day, hours, minutes, seconds);
        const date = new Date(value);
        const dateNow = new Date();

        const diff = Math.round(Math.abs((dateNow.getTime() - date.getTime()) / (60 * 1000)));

        let newValue = '';

        if (diff === 0) {
            newValue = 'agora';
        } else if (diff < 60) {
            newValue = diff + ' minutos atrás';
        } else if (diff < (24 * 60)) {
            newValue = Math.round(diff / 60) + ' horas atrás';
        } else if (diff < (5 * 24 * 60)) {
            newValue = Math.round(diff / (24 * 60)) + ' dias atrás';
        } else {
            newValue = super.transform(date, 'dd/MM/yyyy');
        }


        // if (diff < (12 * 30 * 24 * 60)) {
        //   newValue = Math.round(diff / (30 * 24 * 60)) + ' meses atrás';
        // } else {
        //   newValue = Math.round(diff / (12 * 30 * 24 * 60)) + ' anos atrás';
        // }

        return newValue;
    }
}
