export interface IUsuario {
    id : string,
    correo : string,
    edad? : number
}

export interface IProducto {
    id : string,
    nombre : string,
    precio : number,
    category? : number,
    stock : number
    getData() : string;
}

export interface Carrito {
    items : Array<IProducto>,
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


export interface Repository<T> {
    obtenerPorId(id : number) : T | undefined;
    guardar(item : T) : void;
    Listar() : T[];
}


type productoSinData = Omit<IProducto, 'getData'>;
let produc : productoSinData;
