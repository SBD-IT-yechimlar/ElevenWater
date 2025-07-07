import { Component, AfterViewInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
declare var $: any;

@Component({
  selector: 'app-products',
  imports: [TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent  implements AfterViewInit{

  ngAfterViewInit(): void {
    this.initCarousel();
  }

  private initCarousel(): void {
    if ($('.banner-carousel').length) {
      $('.banner-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        navText: [
          '<span class="flaticon-left-arrow"></span>',
          '<span class="flaticon-right-arrow"></span>'
        ]
      });
    }
  }
}
