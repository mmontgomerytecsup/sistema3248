export const ApiWebURL = "https://servicios.campus.pe/";

export const agregarCarrito = (item, cantidad) => {
    item.cantidad = cantidad == null ? 1 : cantidad;
    if (item.preciorebajado !== "0") {
        item.precio = item.preciorebajado;
    }
    console.log(item);
    let carrito = [];
    if (sessionStorage.getItem("carritocompras")) {
        carrito = JSON.parse(sessionStorage.getItem("carritocompras"));
        let index = -1;
        for (let i = 0; i < carrito.length; i++) {
            if (item.idproducto === carrito[i].idproducto) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            carrito.push(item);
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
        }
        else {
            carrito[index].cantidad++
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
        }
    }
    else {
        carrito.push(item);
        sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
    }

}