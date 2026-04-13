import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../model/product.model';
import { Cart } from '../../../model/cart.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {

  products: Product[] = [];
  userId: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }
addToCart(product: Product) {
  const cart: Cart = {
    userId: this.userId,
    items: [
      {
        productId: product.id,
        quantity: 1
      }
    ]
  };

  this.cartService.addToCart(cart).subscribe(() => {
    alert('Added to cart!');
  });
}
  }