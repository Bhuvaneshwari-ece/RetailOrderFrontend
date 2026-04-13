import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../../../model/cart.model';
import { environment } from '../../Environment/environment';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  //  private apiUrl = 'https://localhost:7289/api';//give backend url
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getCart(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${userId}`);
  }

  addToCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/add`, cart);
  }

  removeFromCart(userId: number, itemId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/remove/${userId}/${itemId}`);
  }
}
