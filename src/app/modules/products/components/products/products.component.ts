import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ShopService } from '../../../../core/auth/services/shop.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var $: any;
import 'notyf/notyf.min.css';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TranslateModule, RouterLink, CommonModule],
templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: any[] = [];


  constructor(private shopService: ShopService ,private toastr: ToastrService) {}

  addToCart(product: any) {
    this.shopService.addToCart(product);
    this.toastr.success('Mahsulot savatga qo\'shildi!', 'Muvaffaqiyatli!');

  }
  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (res) => {

        this.products = res?.data?.items || [];
        localStorage.setItem('products', JSON.stringify(this.products));


      },
      error: (err) => {
        console.error(err);

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
