import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  standalone: false,
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.scss'
})
export class RegistroUsuarioComponent {

  constructor(private usuarioService: UsuarioService) {}

  userForm = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required, this.nombreUsuarioDisponibleValidator()),
    mail: new FormControl('', [Validators.required, Validators.email]),
    contrasenia: new FormControl('', [Validators.required, Validators.minLength(7)]),
    confirmarContrasenia: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
  }, { validators: this.passwordsIgualesValidator('contrasenia', 'confirmarContrasenia') });

  passwordsIgualesValidator(campo1: string, campo2: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(campo1)?.value; //obtengo el valor de los campos a comparar y los comparo
      const confirmarPassword = formGroup.get(campo2)?.value;

      return password === confirmarPassword ? null : { passwordsNoCoinciden: true }; //si son iguales, devuelve null
    };
  }

  nombreUsuarioDisponibleValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => { //el control hace referencia al input que quiero comparar (el nombre)
      if (!control.value) {
        return of(null);
      }
      return this.usuarioService.verificarNombreUsuarioDisponible(control.value).pipe( //consulta al service de usuario para verificar si el usuario existe
        map(disponible => (disponible ? null : { nombreUsuarioNoDisponible: true })),
        catchError(() => of(null))
      );
    };
  }

 registrar() {
  if (this.userForm.valid) { //verifica si paso todas las validaciones
    const { confirmarContrasenia, ...usuario } = this.userForm.value; //excluye el confirmar contraseña para buscar los datos ingresados

    this.usuarioService.registrarUsuario(usuario).subscribe({ //lo envia al usuario service
      next: () => {
        alert('Usuario registrado con éxito'); //muestra el alert de que funciono
        this.userForm.reset();//vacia el formulario
      },
      error: (err) => { //por si ocurre un error
        alert('Error al registrar el usuario');
        console.error(err);
      }
    });
  } else { //si el formulario es invalido
    this.userForm.markAllAsTouched();
    alert('Formulario inválido');
  }
}

}

