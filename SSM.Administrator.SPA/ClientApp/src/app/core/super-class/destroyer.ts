import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 *  Unsubscribe from any Observable using takeUntil and this.destroy$
 *      someObservable.pipe( // lettable operators in rxjs ^5.5.0
 *          ...
 *          takeUntil(destroy$)
 *      )
 *      .subscribe(....
 **/
@Injectable()
export class Destroyer implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnDestroy() {
    // Unsubscribe from whatever used takeUntil(destroy$)
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
