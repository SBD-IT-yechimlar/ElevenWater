import { CommonModule } from '@angular/common';
import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShopService } from '../../../../core/auth/services/shop.service';
declare var $: any;
declare var WOW: any;
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,CommonModule,TranslateModule],
standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(private shopService: ShopService,private toastr: ToastrService) {}
  products: any[] = [];

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

    this.toastr.success('Mahsulot savatga qo\'shildi!', 'Muvaffaqiyatli!');

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
        smartSpeed: 6000,
        autoplaySpeed: 2000,

        autoplayTimeout: 6000,
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
