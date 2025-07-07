import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule,TranslateModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements AfterViewInit {
  activeTab: string = 'about';

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if ($('.bxslider').length) {
        $('.bxslider').bxSlider({
          pagerCustom: '.thumb-box',
          adaptiveHeight: true,
          mode: 'fade',
          captions: true
        });
      }
    }, 0);
  }
}
