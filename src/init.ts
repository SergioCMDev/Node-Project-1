import type{ Producto, IUsuario, Pedido, Administrador, Punto} from './interfaces.js';

let nombre : string = 'hola';

let numbers : number[] = [1, 3,5];
let names : Array<string> = ["pepe", "juan"]
let inStock : boolean = false;
let historico : number[] = [23, 23, 544];
let historico_float : number[] = [23.1, 4];

numbers.push(4);

let tuple : Array<[number, string]> = [[1, "pepe"]];
tuple.push([2, "juan"]);

console.log(tuple[0]);

let error : unknown;
error = "F";
console.log(error);
console.log(suma(1,1));

function suma (a : number, b:number) : number{
    return a + b;
}


const producto1 : Producto = {
        id : "1",
        precio : 3,
        category : 3,
        stock : 5,
        nombre : "pro"
}

const producto2 : Producto = {
        id : "2",
        precio : 5,
        category : 1,
        stock : 10,
        nombre : "pro2"
}


let pedido : Pedido = {
    estado : 'pendiente',
    fechaPedido : new Date(),
    items : [producto1, producto2],
    total : 0,
    calcularTotal() : number{
        let total : number = 0;
        this.items.forEach(element => {
            total += element.precio
        });
        return total;
    }
}

pedido.total = pedido.calcularTotal();

console.log(`Datos pedido ${pedido.total}`);


const usuario : IUsuario = {
    id : "2",
    correo : "email",
    edad : 21
}

console.log(`Usuario ${usuario.correo}`);


const admin1 : Administrador = {
    id : "1",
    permisos : ["1"],
    correo : "email2",
    edad : 45
}

console.log(`Admin ${admin1.permisos}`);


type ID = string | number;
let posicion : Punto = {
    x : 4,
    y : 1
}

let id : ID = '111';
console.log(`Id ${id}`);
console.log(posicion);

