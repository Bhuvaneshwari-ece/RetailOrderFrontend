import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart';
import { Cart } from '../../../model/cart.model';
@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent implements OnInit {
  cart!: Cart;
  userId: number = 1; // temporary user

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart(this.userId).subscribe(data => {
      this.cart = data;
    });
  }

 removeItem(itemId: number) {
  this.cartService.removeFromCart(this.userId, itemId)
    .subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (err) => {
        console.error('Error removing item:', err);
      }
    });
}
}
