import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Subscription } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { ProductsDataService } from '../../services/products-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-id',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoIdComponent implements OnInit, OnDestroy {

  productoEspecifico!: Product;
  private suscripcion!: Subscription;

  constructor(
    private carrito: CarritoService,
    private data: ProductsDataService,
    private route: ActivatedRoute
  ) {}

  agregarCarrito() {
    this.carrito.agregar(this.productoEspecifico);
    alert("Producto agregado correctamente");
  }

  ngOnInit(): void { 
    this.suscripcion = this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if (id) { //verifica que no sea null
          const idNum = +id; // convierte string a número
          this.data.getId(idNum).subscribe(data => {
            this.productoEspecifico = data;
          });
      }
    });
  }

  ngOnDestroy(): void { 
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }
}

