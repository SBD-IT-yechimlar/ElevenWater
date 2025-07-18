import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import 'notyf/notyf.min.css';
import { ShopService } from './../../../../core/auth/services/shop.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, TranslateModule,RouterModule],
templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  activeTab: string = 'desc';
  product: any = null;

  constructor(private route: ActivatedRoute,private shopService:ShopService, private toastr:ToastrService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const stored = localStorage.getItem('products');
    if (stored) {
      const products = JSON.parse(stored);
      this.product = products.find((p: any) => p.id === id);
    }
  }
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
          captions: true,
        });
      }
    }, 0);
  }
  addToCart(product: any) {
    this.shopService.addToCart(product);
    this.toastr.success('Mahsulot savatga qo\'shildi!', 'Muvaffaqiyatli!');

  }
}
