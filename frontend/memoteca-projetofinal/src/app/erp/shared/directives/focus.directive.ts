import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import { OnFocus } from '../core/onfocus.interface';

@Directive({
    selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit {

    @Input()
    focusDelay = 0;

    constructor(public elementRef: ElementRef) { }

    ngAfterViewInit() {

        const natEl = this.elementRef.nativeElement;

        if (this.isOnFocus(this.elementRef.nativeElement)) {
            natEl.onFocus();
        } else {
            setTimeout(() => {
                natEl.focus();
            }, this.focusDelay);
        }
    }

    private isOnFocus(el): el is OnFocus {
        return 'onFocus' in el;
    }

}
