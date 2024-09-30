import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ServiceBase<T> {

  protected abstract readonly PATH: string;

  constructor(protected httpClient: HttpClient) { }

}
