export interface IUsuario {
    id : string,
    correo : string,
    edad? : number
}

export interface Producto {
    id : string,
    nombre : string,
    precio : number,
    category? : number,
    stock : number
}

export interface Carrito {
    items : Array<Producto>,
    total : number,
    calcularTotal() : number
}

export type Estado = 'pendiente' | "procesando" | 'enviado' | 'entregado'

export interface Pedido extends Carrito {
    estado : Estado,
    fechaPedido : Date
}

export interface Administrador extends IUsuario {
    permisos : string []
}

export type Punto = {
    x : number,
    y : number
}