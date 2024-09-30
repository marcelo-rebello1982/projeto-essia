import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';


@Injectable()
export abstract class AbstractComponent implements OnDestroy {

    private _subs = new SubSink();

    protected set subs(sub: Subscription) {
        this._subs.sink = sub;
    }

    ngOnDestroy() {
        this._subs.unsubscribe();
    }

    canDeactivate(): boolean {
        return true;
    }

}
