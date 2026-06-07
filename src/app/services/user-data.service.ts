import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'https://685034f2e7c42cfd1797d7a0.mockapi.io/api/camonkii/users';

@Injectable({
  providedIn: 'root'
})

/**
 * Este servicio se encarga de manejar la comunicación con la API para obtener y crear usuarios.
 * Proporciona métodos para obtener todos los usuarios y para registrar un nuevo usuario.
 */
export class UserDataService { 

  constructor(private http : HttpClient) { }

  /**
   *  Obtiene una lista de todos los usuarios desde la API.
   * @returns Un Observable que emite un array de objetos Usuario.
   */
  getAll() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(URL); 
  }

  /**
   * Registra un nuevo usuario en la API.
   * @param user - Un objeto que contiene los datos del usuario a registrar. 
   * Debe incluir las propiedades necesarias para crear un nuevo usuario en la API.
   * @returns Un Observable que emite la respuesta de la API después de crear el usuario.
   */
  create(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(URL, user); 
  }




}
