let productosEnCarrito = localStorage.getItem("productosEnCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const carritoVacio = document.querySelector("#titulo-principal");
const numeroCart = document.querySelector("#numero-cart");
const contenedorCarritoProductos = document.querySelector("#carrito-producto");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector(".carrito-comprado");

const botonCarritoVaciar = document.querySelector(".carrito-acciones-vaciar");
const totalCompra = document.querySelector(".carrito-acciones-total");
const botonComprar = document.querySelector("#boton-comprar");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    actualizarNumCart();

    contenedorCarritoProductos.innerHTML = "";
    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `<div class="card-body contenedor-productos-carrito">
  <img class="img-carrito" src="${producto.imagen}" alt="${producto.imagen}">
  <div class="carrito-producto-titulo">
      <small>nombre:</small>
      <h4>${producto.id}</h4>
  </div>
  <div class="carrito-producto-cantidad">
      <small>cantidad</small>
      <p>${producto.cantidad}</p>
  </div>
  <div class="carrito-producto-precio">
      <small>precio</small>
      <p>${producto.precio}</p>
  </div>
  <div class="carrito-producto-titulo">
      <small>subtotal</small>
      <p>${producto.precio * producto.cantidad}</p>
  </div>
  <button class="btn btn-dark carrito-producto-eliminar" id="${
    producto.id
  }"><i class="bi bi-trash3"></i></button>
</div>
  `;
      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    carritoVacio.innerText = "Tu Carrito esta vacio :(";
  }
  actualizarBotonEliminar();
  actualizarTotal();
}

cargarProductosCarrito();
botonCarritoVaciar.addEventListener("click", vaciarCarrito);
function actualizarNumCart() {
  let numerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroCart.innerText = `  (${numerito})`;
}

function eliminarDelCarrito(e) {
  let idBoton = e.currentTarget.id;

  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );

  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();
  localStorage.setItem(
    "productosEnCarrito",
    JSON.stringify(productosEnCarrito)
  );

  Toastify({
    text: "Producto Quitado! X ",
    duration: 1500,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: false,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true,

    style: {
      background: "linear-gradient(to right, #FF0000, #8B0000)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function actualizarBotonEliminar() {
  botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  botonEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}
function vaciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productosEnCarrito",
    JSON.stringify(productosEnCarrito)
  );
  cargarProductosCarrito();
}
function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  totalCompra.innerText = `${totalCalculado}`;
}
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productosEnCarrito",
    JSON.stringify(productosEnCarrito)
  );

  // animacion
  Swal.fire("Muchas gracias", "Se cargó correctamente el pedido", "success");
  carritoVacio.innerText = "Gracias por comprar en la percha!";
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
}
