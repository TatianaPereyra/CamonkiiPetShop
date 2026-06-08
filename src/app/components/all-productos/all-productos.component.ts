import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Subscription } from 'rxjs';
import { ProductsDataService } from '../../services/products-data.service';

@Component({
  selector: 'app-all-productos',
  standalone: false,
  templateUrl: './all-productos.component.html',
  styleUrl: './all-productos.component.scss'
})
export class AllProductosComponent {
  listaProductos: Product[] = [];
  private suscripcion!: Subscription;

  constructor(private productos: ProductsDataService) {}

  @ViewChild('contenedor', { static: false }) contenedor!: ElementRef; //Referencia al contenedor de productos

  ngOnInit(): void { //funcion para suscribirme
    this.suscripcion = this.productos.getAll().subscribe(data => {
      this.listaProductos = data;
    });
  }

  ngOnDestroy(): void { //funcion para desuscribirme
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  /**
   * Función para optimizar el rendimiento del ngFor, identificando cada producto por su id único.
   * 
   * @param index número de índice del producto en la lista. 
   * 
   * @param item objeto del producto actual en la iteración.
   * 
   * @returns id del producto, que se utiliza como clave para el seguimiento de cambios en la lista de productos. 
   * Esto ayuda a Angular a identificar qué elementos han cambiado, agregado o eliminado, 
   * mejorando así el rendimiento al renderizar la lista.
   */
  trackById(index: number, item: Product): number {
    return item.id;
  }
}

