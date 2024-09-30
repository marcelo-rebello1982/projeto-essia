import { Injectable, EventEmitter } from '@angular/core';


export class KeyboardEventService {

    static escPressed: EventEmitter<boolean> = new EventEmitter<boolean>();

}
