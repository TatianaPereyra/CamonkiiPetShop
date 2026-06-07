import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

const URL = 'https://685034f2e7c42cfd1797d7a0.mockapi.io/api/camonkii/products';

@Injectable({
  providedIn: 'root'
})

export class ProductsDataService {

  constructor(private http : HttpClient) { }

  getAll() : Observable<Product[]>{
    return this.http.get<Product[]>(URL);
  }

  getId(id: number): Observable<Product> {
    return this.http.get<Product>(`${URL}/${id}`); 
  }



}
