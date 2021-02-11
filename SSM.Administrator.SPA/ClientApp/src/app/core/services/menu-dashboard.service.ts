import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuDashboardService {

  changed$: Subject<string> = new Subject();
  
  constructor() { }
}
