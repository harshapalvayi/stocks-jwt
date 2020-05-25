import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static getPairOfColors(index) {
    const colors = [ '#03a33e', '#F0F5F0'];
    return colors[index];
  }

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
