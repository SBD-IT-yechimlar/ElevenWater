import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ShopService } from '../../../../core/auth/services/shop.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
declare var $: any;
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TranslateModule, RouterLink, CommonModule],
templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: any[] = [];

  private notyf = new Notyf({
    position: {
      x: 'right',
      y: 'top'
    },
    types: [
      {
        type: 'success',
        background: 'green',
        duration: 3000,

      },
      {
        type: 'error',
        background: 'indianred',
        duration: 3000,
      }
    ],
    duration: 3000
  });
  constructor(private shopService: ShopService ,private messageService:MessageService) {}

  addToCart(product: any) {
    this.shopService.addToCart(product);
    this.notyf.success('Mahsulot savatchaga qo‘shildi!');

  }
  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (res) => {

        this.products = res?.data?.items || [];
        localStorage.setItem('products', JSON.stringify(this.products));


      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'xatolik',
          detail: 'Buyurtma yuborilmadi!',
        });
      },
    });
  }

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
          '<span class="flaticon-right-arrow"></span>',
        ],
      });
    }
  }
}
