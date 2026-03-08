import type{ IProducto, IUsuario, Pedido, Administrador, Punto} from './interfaces.js';
import { suma, validarCampo, formatearError, validarEmail, validarTelefono} from './functions.js';
import { obtenerPropiedad } from './generics.js'
import { PiezasReparacion, RepositoryProductos, Publicacion, CacheMap, LibroPrestable, Biblioteca } from './classes.js'

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



const producto1 : IProducto = {
        id : "1",
        precio : 3,
        category : 3,
        stock : 5,
        nombre : "pro",
        getData() : string{
            return "";
        }
}

const producto2 : IProducto = {
        id : "2",
        precio : 5,
        category : 1,
        stock : 10,
        nombre : "pro2",
        getData() : string{
            return "";
        }
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
    id : "1",
    correo : "email",
    edad : 21
}

const usuario2 : IUsuario = {
    id : "1",
    correo : "email2",
    edad : 211
}


console.log(`Usuario ${usuario.correo}`);


const admin1 : Administrador = {
    id : "1",
    permisos : ["1"],
    correo : "email21",
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



let res : string = validarCampo("pepe", [validarEmail, validarTelefono]);
console.log(`Res ${res}`);

console.log(`formatear ${formatearError(["EEE1d", "AAAA", "FFFF"])}`)


const usuarioGenerics = {nombre: 'Pedro', edad: 23, activo: true};

console.log(obtenerPropiedad(usuarioGenerics, "nombre"));
console.log(obtenerPropiedad(usuarioGenerics, "edad"));

let repositoryProductos = new RepositoryProductos();
let pieza1 = new PiezasReparacion("1", "rueda", 12, 345);
    repositoryProductos.guardar(pieza1);
    let products = repositoryProductos.Listar();

    products.forEach(element => {
        console.log(`Product ${element.getData()}`);
    });


interface Configuration {
    setTimeout : number;
    maxItems : number;
    nombre : string;
}

type partialConfiguration = Partial<Configuration>;
function inicializarCache (config : partialConfiguration) : void{
    config.maxItems = 1;
    config.nombre = "pepe";
    config.setTimeout = 1;
}

let config1 : partialConfiguration = {};
inicializarCache(config1);

console.log(`Config 1 ${config1.nombre}`)


type CacheDeUsuarios = CacheMap<IUsuario>;

// Y lo usas como cualquier tipo
let cache: CacheDeUsuarios = new CacheMap<IUsuario>();

cache.set("1", usuario);
cache.set("2", usuario2);

console.log(`${cache.get("1")?.correo}`);

let publicacion1 = new Publicacion("libro1", "Autor1", 1203, 23.56);
publicacion1.getPrecio();

let libro1 = new LibroPrestable("1", 234, "tes", "OJO", "Autor", 1234, 23.4);
let libro2 = new LibroPrestable("1", 2341, "tes1", "OJO2", "Autor", 1234, 23.4);

let biblioteca = new Biblioteca();
biblioteca.agregar(libro1);
biblioteca.agregar(libro2);

biblioteca.listarDisponibles().forEach( libro => {
    console.log(`Libro ${libro.titulo}`);
});