import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  collapseAll$: Subject<boolean> = new Subject();
  
  constructor() { }

  collapseAll() {
    this.collapseAll$.next(false);
  }
  openAll() {
    this.collapseAll$.next(true);
  }
}
