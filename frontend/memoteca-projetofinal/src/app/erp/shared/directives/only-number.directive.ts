import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[appOnlyNumber]'
})
export class OnlyNumberDirective {

    regexStr = '^[0-9]*$';

    constructor(private el: ElementRef) { }

    @HostListener('keyup', ['$event'])
    onKeyup(event) {
        const value: string = event.target.value;
        const result = value.replace(/\D/g, '');
        event.target.value = result ? +result.replace(/\D/g, '') : '';
    }
}
