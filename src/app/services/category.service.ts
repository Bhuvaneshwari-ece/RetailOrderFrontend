import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any[]>(this.api);
  }

  addCategory(data: any) {
    return this.http.post(this.api, data);
  }

  updateCategory(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
