import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../app/Environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
   constructor(private http: HttpClient) {}

  pay(data: any) {
    return this.http.post(`${environment.apiUrl}/payments`, data);
  }
}
