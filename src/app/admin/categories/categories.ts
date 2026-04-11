import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  name = '';
  description = '';

  editMode = false;
  editId: number | null = null;

  constructor(private service: CategoryService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  add() {
    const data = {
      name: this.name,
      description: this.description,
    };

    if (this.editMode) {
      this.service.updateCategory(this.editId!, data).subscribe(() => {
        this.reset();
      });
    } else {
      this.service.addCategory(data).subscribe(() => {
        this.reset();
      });
    }
  }

  edit(c: any) {
    this.name = c.name;
    this.description = c.description;

    this.editMode = true;
    this.editId = c.id;
  }
  cancelEdit(): void {
    this.reset();
  }
  reset() {
    this.load();

    this.name = '';
    this.description = '';

    this.editMode = false;
    this.editId = null;
  }

  delete(id: number) {
    this.service.deleteCategory(id).subscribe(() => {
      this.load();
    });
  }
}
