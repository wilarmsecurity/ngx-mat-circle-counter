import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';

export type Size = 'mini' | 'xs' | 's' | 'm' | 'l' | 'xl';

export enum SizeConverter {
  mini = 40, xs = 100, s = 150, m = 200, l = 250, xl = 300
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-mat-circle-counter',
  templateUrl: `./ngx-mat-circle-component.html`,
  styleUrls: [`./ngx-mat-circle-component.scss`]
})
export class NgxMatCircleCounterComponent implements OnInit {

  @Input() start = 0;
  @Input() size: string;
  @Input() color = 'primary';
  @Input() textColor = '';
  @Input() speed = 10;
  @Input() value = 100;
  @Input() mode: 'viewport' | 'pageinit' = 'pageinit';
  @Input() thickness = 10;
  public count = 0;
  public percent = 0;
  public sizeClass: string;
  public sizeNumber: number;
  private animationHasRun: boolean;
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onWindowChange = (event) => {
    if (this.mode !== 'viewport') {
      return;
    }
    if (!this.animationHasRun && this.isElementInViewport()) {
      this.startAnimation();
    }
  }

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
    this.sizeClass = 'size-' + (this.size || 'm');
    this.sizeNumber = +SizeConverter[(this.size || 'm')];
    // console.log('size', this.size);
    if (this.mode === 'pageinit') {
      this.startAnimation();
    }
  }

  private startAnimation() {
    this.animationHasRun = true;
    this.count = this.start;
    // Start
    const interval = setInterval(async () => {
      if (this.start > this.value) {
        this.count--;
        this.percent = Math.abs(+(((this.start - this.count) / (this.start - this.value)) * 100).toFixed(0));
      } else {
        this.count++;
        this.percent = Math.abs(+(((this.count - this.start) / (this.value - this.start)) * 100).toFixed(0));
      }
      // End
      if (this.count === this.value) {
        // console.log('End');
        clearInterval(interval);
      }
      // console.log(this.count === this.value, this.count, this.percent + ' %');
    }, this.speed);
  }

  private listenEvents() {
    if (this.mode !== 'viewport') {
      return;
    }
    if (!this.animationHasRun && this.isElementInViewport()) {
      this.startAnimation();
    }
  }

  public isElementInViewport(): boolean {
    // console.log('viewport', this.size);
    const rect = this.hostElement.nativeElement.getBoundingClientRect();
    // tslint:disable-next-line
    return rect.top >= 0 && rect.bottom <= ((window as any).innerHeight || document.documentElement.clientHeight);
  }

}
