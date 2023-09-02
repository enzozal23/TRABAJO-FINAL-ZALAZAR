const contenedorProductos = document.querySelector(".contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloCategorias = document.querySelector(".categorias");
const buscador = document.querySelectorAll("#searchOfProduct");
const botonBuscar = document.querySelector("#buscar");
let botonAgregar = document.querySelectorAll(".botones-agregar");
const numeroCart = document.querySelector("#numero-cart");

function cargarProductos() {
  return fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

//Usamos la funcion cargarproductos, cuando devuelve un valor se le asigna "productos"

productos = [];
cargarProductos().then((data) => {
  productos = data;
  mostrarProductos(productos);
});
mostrarProductos(productos);

function mostrarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
    <div class="card-body">
      <h5 class="card-title">${producto.titulo}</h5>
      <p class="card-text text-dark">$${producto.precio}</p>
      <button class="btn btn-primary botones-agregar" id="${producto.id}">agregar</button>
    </div>
        `;

    contenedorProductos.append(div);
  });
  actualizarBotonAgregar();
}

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const productoCategoria = productos.find(
      (producto) => producto.categoria.id === e.currentTarget.id
    );

    tituloCategorias.innerText = productoCategoria.categoria.id;

    const productosBoton = productos.filter(
      (producto) => producto.categoria.id === e.currentTarget.id
    );
    mostrarProductos(productosBoton);
  });
});

// buscador
buscador.forEach((element) => {
  element.addEventListener("input", (evento) => {
    botonBuscar.addEventListener("click", (e) => {
      e.preventDefault();
      const buscar = evento.target.value;
      const productosBuscado = productos.filter(
        (producto) =>
          producto.categoria.id === buscar ||
          producto.categoria.nombre === buscar
      );

      if (productosBuscado.length == 0) {
        tituloCategorias.innerText = `No se encontro: "${buscar}"`;
        contenedorProductos.innerHTML = "";
      } else {
        tituloCategorias.innerText = ` se encontraron ${productosBuscado.length} resultados de "${buscar}" `;
        mostrarProductos(productosBuscado);
      }
    });
  });
});
function actualizarBotonAgregar() {
  botonAgregar = document.querySelectorAll(".botones-agregar");
  botonAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLs = localStorage.getItem("productosEnCarrito");
if (productosEnCarritoLs) {
  productoEnCarrito = JSON.parse(productosEnCarritoLs);
  actualizarNumCart();
} else {
  productoEnCarrito = [];
}

function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );
  if (productoEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productoEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productoEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productoEnCarrito.push(productoAgregado);
  }
  Toastify({
    text: "Agregado Correctamente!",
    duration: 1500,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: false,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true,

    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
  actualizarNumCart();
  localStorage.setItem("productosEnCarrito", JSON.stringify(productoEnCarrito));
}

function actualizarNumCart() {
  let numerito = productoEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  console.log(numerito);
  numeroCart.innerText = `  (${numerito})`;
}
