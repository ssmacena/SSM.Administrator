import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Destroyer } from '@app/core/super-class';
import { PanelService } from '@app/core/services';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent extends Destroyer implements OnInit {
  @Input() collapse = true;
  @Input() title?: string;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  collapseAll$: Subscription;

  constructor(private panelService: PanelService) {
    super();

    this.collapseAll$ = this.panelService.collapseAll$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.collapse = value;
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.collapseAll$.unsubscribe();
  }

  onclickHeader() {
    this.collapse = !this.collapse;
    this.toggle.emit(this.collapse);
  }
}
