import {  Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ShopService } from '../../../../core/auth/services/shop.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-basket',
  imports: [TranslateModule, CommonModule, FormsModule, ToastModule ,RouterModule,RouterLink],
templateUrl: './product-basket.component.html',
  styleUrl: './product-basket.component.scss',
  providers: [MessageService],
})
export class ProductBasketComponent implements OnInit {
  cartItems: any[] = [];


  constructor(public shopService: ShopService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.shopService.cartItems$.subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.sell_cost_uzs * item.quantity,
      0
    );
  }
  removeItem(id: number) {
    this.shopService.removeFromCart(id);
    this.toastr.error('Mahsulot savatdan olib tashlandi!');

  }
  updateCart() {
    this.shopService.clearCart();
    this.toastr.success('Savat tozalandi!', 'Muvaffaqiyatli!');
  }
}
