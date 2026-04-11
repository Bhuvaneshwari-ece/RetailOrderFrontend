import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = `${environment.apiUrl}/products`; //  change port
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(this.api);
  }

  addProduct(data: any) {
    return this.http.post(this.api, data);
  }
  updateProduct(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
