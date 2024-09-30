import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[appLink]'
})
export class LinkDirective {

    @HostBinding('class')
    appLink = 'app-link';

    constructor() { }

}
