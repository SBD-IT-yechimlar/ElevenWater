import { CommonModule } from '@angular/common';
import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShopService } from '../../../../core/auth/services/shop.service';
declare var $: any;
declare var WOW: any;
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,CommonModule,TranslateModule],
standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(private shopService: ShopService) {}
  products: any[] = [];
  private notyf = new Notyf({
    position: {
      x: 'right',
      y: 'top'
    },
    duration: 3000
  });
  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (res) => {
        this.products = res?.data?.items || [];
      },
      error: (err) => {
        console.error(err);}
    });
  }
  addToCart(product: any) {
    this.shopService.addToCart(product);
    this.notyf.success('Mahsulot savatchaga qo‘shildi!');

  }
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
