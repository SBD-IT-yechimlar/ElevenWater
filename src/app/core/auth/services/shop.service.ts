import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private API = 'https://api.asbd.uz/api/bot/shop/data';
  private cartItems = new BehaviorSubject<any[]>(this.addCart());
  cartItems$ = this.cartItems.asObservable();
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    const payload = {
      owner_id: 16,
      branch_id: 21,
      limit: 100,
      offset: 0,
      type: 'product',
      type_id: 1261,
    };
    return this.postRequest('bot/shop/data', payload);
  }
  loginGuest(payload: { email: string, password: string }) {
    return this.http.post('https://api.asbd.uz/api/user/login', payload);
  }


  postRequest<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`https://api.asbd.uz/api/${url}`, data);
  }

  private addCart(): any[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  private saveCart(items: any[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items);
  }
  addToCart(product: any): void {
    const cart = this.addCart();
    const existingProduct = cart.find((item: any) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    this.saveCart(cart);
  }


  removeFromCart(productId: number) {
    const updated = this.cartItems
      .getValue()
      .filter((item) => item.id !== productId);
    this.saveCart(updated);
  }

  updateQuantity(productId: number, quantity: number) {
    const updated = this.cartItems
      .getValue()
      .map((item) => (item.id === productId ? { ...item, quantity } : item));
    this.saveCart(updated);
  }

  clearCart() {
    this.saveCart([]);
  }
  placeOrder(clientData: any, headers: HttpHeaders): Observable<any> {
    const items = this.cartItems.getValue();

    const products = items.map((item) => ({
      product_id: item.id,
      price: +item.sell_cost_uzs,
      ordered_amount: item.quantity,
      sum_row: +item.sell_cost_uzs * item.quantity,
    }));

    const payload = {
      ...clientData,
      products,
    };

    return this.http.post<any>(
      'https://api.asbd.uz/api/delivery/water/order/web',
      payload,
      { headers }
    );
  }
}
