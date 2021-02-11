import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.css'],
})
export class ScrollUpComponent implements OnInit {
  windowScrolled: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;

      var calculatedScroll = currentScroll - currentScroll / 8;

      if (calculatedScroll > 8) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, calculatedScroll);
      } else {
        window.scrollTo(0, 0);
      }
    })();
  }

  ngOnInit() {}
}
