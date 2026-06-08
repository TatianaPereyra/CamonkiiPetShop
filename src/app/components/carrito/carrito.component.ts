import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  productosAgregados: Product[] = [];
  private suscripcion!: Subscription;

   constructor(private agregados: CarritoService) {}

    ngOnInit(): void { //funcion para suscribirme
    this.suscripcion = this.agregados.getAll().subscribe(data => {
      this.productosAgregados = data;
    });
  }

  ngOnDestroy(): void { 
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }
  
   trackById(index: number, item: Product): number {
    return item.id;
  }

  eliminarProducto(producto: Product){
    this.agregados.eliminar(producto.id);
  }

  totalProductos() : number{
    return this.productosAgregados.length;
  }

  totalMonto(): number{
    let total = 0;
    for(let producto of this.productosAgregados){
      total += producto.price;
    }
    return total;
  }

}
