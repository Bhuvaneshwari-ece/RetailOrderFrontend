import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductsComponent implements OnInit {
  name = '';
  price = 0;
  stock = 0;
  categoryId = 0;

  categories: any[] = [];
  products: any[] = [];

  // ✅ ADD THESE
  editMode = false;
  editId: number | null = null;

  constructor(
    private service: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  loadProducts() {
    this.service.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  // ✅ SINGLE METHOD (FIXED)
  addProduct() {
    const data = {
      name: this.name,
      price: this.price,
      stock: this.stock,
      categoryId: this.categoryId,
    };

    if (this.editMode) {
      this.service.updateProduct(this.editId!, data).subscribe(() => {
        this.resetForm();
      });
    } else {
      this.service.addProduct(data).subscribe(() => {
        this.resetForm();
      });
    }
  }
  cancelEdit() {
    this.resetForm();
  }

  edit(p: any) {
    this.name = p.name;
    this.price = p.price;
    this.stock = p.stock;
    this.categoryId = p.categoryId;

    this.editMode = true;
    this.editId = p.id;
  }

  // ✅ ADD THIS
  resetForm() {
    this.loadProducts();

    this.name = '';
    this.price = 0;
    this.stock = 0;
    this.categoryId = 0;

    this.editMode = false;
    this.editId = null;
  }

  delete(id: number) {
    this.service.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
