let nombre = 'hola';
let numbers = [1, 3, 5];
let names = ["pepe", "juan"];
let inStock = false;
let historico = [23, 23, 544];
let historico_float = [23.1, 4];
numbers.push(4);
let tuple = [[1, "pepe"]];
tuple.push([2, "juan"]);
console.log(tuple[0]);
let error;
error = "F";
console.log(error);
console.log(suma(1, 1));
function suma(a, b) {
    return a + b;
}
const producto1 = {
    id: "1",
    precio: 3,
    category: 3,
    stock: 5,
    nombre: "pro"
};
const producto2 = {
    id: "2",
    precio: 5,
    category: 1,
    stock: 10,
    nombre: "pro2"
};
let pedido = {
    estado: 'pendiente',
    fechaPedido: new Date(),
    items: [producto1, producto2],
    total: 0,
    calcularTotal() {
        let total = 0;
        this.items.forEach(element => {
            total += element.precio;
        });
        return total;
    }
};
pedido.total = pedido.calcularTotal();
console.log(`Datos pedido ${pedido.total}`);
const usuario = {
    id: "2",
    correo: "email",
    edad: 21
};
console.log(`Usuario ${usuario.correo}`);
const admin1 = {
    id: "1",
    permisos: ["1"],
    correo: "email2",
    edad: 45
};
console.log(`Admin ${admin1.permisos}`);
let posicion = {
    x: 4,
    y: 1
};
let id = '111';
console.log(`Id ${id}`);
console.log(posicion);
export {};
//# sourceMappingURL=init.js.map