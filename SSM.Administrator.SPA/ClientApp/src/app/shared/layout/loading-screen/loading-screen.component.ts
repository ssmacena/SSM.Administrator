import { Component, OnInit } from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { Destroyer } from '@app/core/super-class';
import { LoadingScreenService } from '@app/core/services';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css'],
})
export class LoadingScreenComponent extends Destroyer implements OnInit {
  loading: boolean = false;

  constructor(private loadingScreenService: LoadingScreenService) {
    super();

    this.loadingScreenService.loadingStatus$
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.loading = value;
      });
  }

  ngOnInit() {}
}
