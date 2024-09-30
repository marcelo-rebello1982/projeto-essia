import { Directive, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appIsLast]'
})
export class LastItemDirective implements OnInit {

    @Input()
    appIsLast!: boolean;

    @Output()
    lastDone: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {
        if (this.appIsLast) {
            this.lastDone.emit(true);
        }
    }
}
