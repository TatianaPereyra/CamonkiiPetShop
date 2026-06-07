/**
 * Interfaz que representa un usuario en la aplicación.
 * Contiene las propiedades necesarias para describir un usuario, como su identificador, 
 * nombre, nombre de usuario, correo electrónico, edad y contraseña.
 */
export interface Usuario{
    id: number;
    name : string;
    nombreUsuario: string;
    mail: string;
    edad: number;
    contrasenia: string;
}