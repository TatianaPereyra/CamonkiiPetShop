import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestacadosComponent } from './components/destacados/destacados.component';
import { AllProductosComponent } from './components/all-productos/all-productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ProductoIdComponent } from './components/producto-id/producto-id.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';


/**
 * Define las rutas de la aplicación. 
 * Cada ruta se asocia con un componente específico que se renderiza cuando el usuario navega a esa ruta. 
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DestacadosComponent
  },
  {path: 'destacados',
    component: DestacadosComponent
  },
  {
    path: 'productos',
    component: AllProductosComponent
  },
  {
    path: 'miCarrito',
    component: CarritoComponent
  },
  {
    path: 'producto/:id',
    component: ProductoIdComponent
  },
  {
    path: 'singUp',
    component: RegistroUsuarioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
