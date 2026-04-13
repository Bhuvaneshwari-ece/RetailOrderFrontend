import { Component } from '@angular/core';
import { OrderService } from '../../../core/services/order-service';
import { PaymentService } from '../../../core/services/payment-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cartItems: any[] = [];
  paymentMethod: string = 'Cash';
  isLoading = false;

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    // Receive cart from Member 3
    this.cartItems = history.state.cart || [];
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Cart is empty ❌');
      return;
    }

    this.isLoading = true;

    const orderData = {
      items: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (orderRes) => {

        const paymentData = {
          orderId: orderRes.id,
          paymentMethod: this.paymentMethod
        };

        this.paymentService.pay(paymentData).subscribe({
          next: () => {
            alert('Order placed & Payment successful ✅');
            this.isLoading = false;
          },
          error: () => {
            alert('Payment failed ❌');
            this.isLoading = false;
          }
        });

      },
      error: () => {
        alert('Order failed ❌');
        this.isLoading = false;
      }
    });
  }
}
