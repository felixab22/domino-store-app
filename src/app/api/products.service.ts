import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'environments/environment.development';
import { Product } from '@shared/model/produc.nterface';

@Injectable({
  providedIn: 'root',
})
export class productService {
  public products = signal<Product[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiUrl;
  private readonly _apiProduct = environment.apiProduct;

  constructor() {
    this.getProducts();
  }
  public getProducts(): void {
    this._http
      .get<Product[]>(`${this._endPoint}${this._apiProduct}?sort=desc`)
      .pipe(tap((data: Product[]) => this.products.set(data)))
      .subscribe();
  }

  public getProductById(id: number) {
    return this._http.get<Product>(
      `${this._endPoint}${this._apiProduct}/${id}`
    );
  }
}
