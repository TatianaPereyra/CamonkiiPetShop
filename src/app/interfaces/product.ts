/**
 * Interfaz que representa un producto en la aplicación.
 * Contiene las propiedades necesarias para describir un producto, como su identificador, 
 * nombre, descripción breve, descripción completa, precio, imagen y si es destacado o no.
 */
export interface Product{
    id: number;
    name : string;
    breveDescripcion: string;
    descripcionCompleta: string;
    price: number;
    img: string;
    esDestacado: boolean;
}