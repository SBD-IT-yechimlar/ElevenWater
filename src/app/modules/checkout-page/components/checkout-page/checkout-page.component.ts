
import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../../core/auth/services/shop.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-checkout-page',
  imports: [FormsModule,CommonModule,TranslateModule],
templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent implements OnInit {

  orderForm = {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    comment: '',
  };

  cartItems: any[] = [];

  constructor(private shopService: ShopService, private router: Router,private toastr:ToastrService) {}

  ngOnInit() {
    const stored = localStorage.getItem('cart');
    this.cartItems = stored ? JSON.parse(stored) : [];
  }
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.sell_cost_uzs * item.quantity;
    }, 0);}

    generateGuestClientId(): number {
      return Math.floor(Math.random() * 1000000);
    }



    submitOrder() {
      const clientId = this.generateGuestClientId();
      if (this.cartItems.length === 0) {
        this.toastr.warning('Savat bo‘sh! Iltimos, mahsulot tanlang.');
        return;
      }
      const token = localStorage.getItem('token');
      const expiry = localStorage.getItem('token_expiry');

      const now = new Date().getTime();

      if (!token || !expiry || now > +expiry) {
        // Token yo‘q yoki eskirgan — login qilish kerak
        const loginPayload = {
          email: 'bot',
          password: 'Asd*-'
        };

        this.shopService.loginGuest(loginPayload).subscribe({
          next: (loginRes: any) => {
            localStorage.setItem('token', loginRes.token);
            localStorage.setItem('token_expiry', (new Date().getTime() + loginRes.expiresIn * 1000).toString());

            this.sendOrder(loginRes.token, clientId);
          },
          error: () => {
            this.toastr.error('Login qilishda xatolik yuz berdi!');
          }
        });
      } else {
        this.sendOrder(token, clientId);
      }
    }
    sendOrder(token: string, clientId: number) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const fullComment = `
        Telefon: ${this.orderForm.phone}
        Ism: ${this.orderForm.firstName} ${this.orderForm.lastName}
        Manzil: ${this.orderForm.address}
        Izoh: ${this.orderForm.comment}
      `.trim();

      const payload = {
        client_id: clientId,
        delivery_address: this.orderForm.address,
        comment: fullComment,
        products: this.cartItems.map(item => ({
          product_id: item.id,
          price: +item.sell_cost_uzs,
          ordered_amount: item.quantity,
          sum_row: +item.sell_cost_uzs * item.quantity
        })),
        location: "41.33942112744839, 69.27167081193654",
        date: new Date().toISOString()
      };

      this.shopService.placeOrder(payload, headers).subscribe({
        next: () => {
          this.shopService.clearCart();
          this.toastr.success('Buyurtma muvaffaqiyatli yuborildi!');
        },
        error: () => {
          this.toastr.error('Buyurtma yuborishda xatolik yuz berdi!');
        }
      });
    }


}
