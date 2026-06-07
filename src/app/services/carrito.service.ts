import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productosAgregados: Product[] = [];
  private productosSubject = new BehaviorSubject<Product[]>([]); //Observable para emitir los cambios en el carrito

  constructor() {
    const guardados = localStorage.getItem('carrito');//verifico si hay productos guardados en el localStorage

    if (guardados) {
      this.productosAgregados = JSON.parse(guardados);
      this.productosSubject.next(this.productosAgregados);//emito el estado inicial del carrito con los productos guardados en el localStorage
    }
  }

  agregar(producto: Product) {
    this.productosAgregados = [...this.productosAgregados, producto];
    this.actualizarLocalStorage();
    this.productosSubject.next(this.productosAgregados);
  }

  getAll(): Observable<Product[]> {
    return this.productosSubject.asObservable();
  }

  eliminar(id: number) {
    for (let i = 0; i < this.productosAgregados.length; i++) {

      if (this.productosAgregados[i].id === id) {
        this.productosAgregados.splice(i, 1);
        this.actualizarLocalStorage();
        this.productosSubject.next(this.productosAgregados);
        break;
      }
    }
  }

  /**
   * Actualiza el localStorage con el estado actual del carrito. 
   * Se llama cada vez que se agrega o elimina un producto para mantener el almacenamiento
   * sincronizado con el estado del carrito.
   */
  private actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.productosAgregados));
  }
}
