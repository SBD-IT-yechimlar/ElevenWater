import { CommonModule } from '@angular/common';
import {  AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
declare var $: any;
declare var WOW: any;

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,CommonModule,TranslateModule],
standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initCarousel();
    setTimeout(() => {
      new WOW().init();
      window.scrollBy(0, 1);
    }, 100);

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

  activeTab: string = 'about';

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }




}
