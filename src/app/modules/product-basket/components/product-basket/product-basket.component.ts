import {  Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ShopService } from '../../../../core/auth/services/shop.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-product-basket',
  imports: [TranslateModule, CommonModule, FormsModule, ToastModule],
  templateUrl: './product-basket.component.html',
  styleUrl: './product-basket.component.scss',
  providers: [MessageService],
})
export class ProductBasketComponent implements OnInit {
  cartItems: any[] = [];

  private notyf = new Notyf({
    position: {
      x: 'right',
      y: 'top'
    },
    duration: 3000
  });
  constructor(public shopService: ShopService) {}

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
    this.notyf.error('Mahsulot savatdan olib tashlandi!');

  }
}
