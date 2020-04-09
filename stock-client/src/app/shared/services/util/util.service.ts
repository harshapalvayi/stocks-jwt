import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  getLoader() {
    return this.loader;
  }

  showSpinner() {
    return this.loader.next(true);
  }

  hideSpinner() {
    return this.loader.next(false);
  }

}
