import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: 'button[appButtonInvalid]',
})
export class ButtonInvalidDirective {

    @Input()
    @HostBinding('class.btn-invalid')
    appButtonInvalid = false;

    constructor(private el: ElementRef) {
    }

}
