import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../../core/auth/services/shop.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-checkout-page',
  imports: [FormsModule,CommonModule],
templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent implements OnInit {

  orderForm = {
    phone: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
  };

  cartItems: any[] = [];

  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('cart');
    this.cartItems = stored ? JSON.parse(stored) : [];
  }
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.sell_cost_uzs * item.quantity;
    }, 0);}

    generateGuestClientId(): number {
      return Math.floor(Math.random() * 1000000); // bu endi son
    }



  submitOrder() {
    const clientId = this.generateGuestClientId();

    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJvdCIsInVzZXJJZCI6MzM0LCJvd25lciI6MTYsImJyYW5jaCI6MjEsImlzX21haW4iOjEsImlhdCI6MTc1MTk3MDY4MywiZXhwIjoxNzUyMDA2NjgzfQ.AS1sMkW7_KZlXNIJ7Y2TErE54ZVltdtaiuC77FI2mv0');
    }

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const products = this.cartItems.map(item => ({
      product_id: item.id,
      ordered_amount: item.quantity,
      price: Number(item.sell_cost_uzs),
      sum_row: Number(item.sell_cost_uzs) * item.quantity,
          }));
          const payload = {
            client_id: clientId,
            delivery_address: this.orderForm.address,
            comment: `${this.orderForm.address}, ${this.orderForm.firstName} ${this.orderForm.lastName}`,
            products: this.cartItems.map(item => ({
              product_id: item.id,
              price: +item.sell_cost_uzs,
              ordered_amount: item.quantity,
              sum_row: +item.sell_cost_uzs * item.quantity
            })),
            location: "41.33942112744839, 69.27167081193654",
            date: new Date().toISOString()
          };

          console.log('payload---', payload);

    this.shopService.placeOrder(payload, headers).subscribe({
      next: res => {
        this.shopService.clearCart();
        this.router.navigate(['/thank-you']);
        console.log('ketti:', res);
      },
      error: err => {
        console.error('ketmadi:', err);
      }
    });
  }

}
