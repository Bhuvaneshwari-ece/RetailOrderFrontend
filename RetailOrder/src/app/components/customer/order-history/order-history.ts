import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../../../core/services/order-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  imports: [FormsModule,CommonModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistory {

 orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: () => {
        alert('Failed to load orders ❌');
      }
    });
  }
}
