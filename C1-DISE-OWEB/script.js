const productosMock = [
    { id: 1, nombre: "Arroz  ", categoria: "abarrotes", precio: "S/ 18.50", oferta: true, img: "https://metroio.vtexassets.com/arquivos/ids/453498/ARROZ-SUPERIOR-X-5KG-CUISINE-CO-1-351639056.jpg?v=638285249186930000" },
    { id: 2, nombre: "Aceite  ", categoria: "abarrotes", precio: "S/ 7.90", oferta: true, img: "https://media.falabella.com/tottusPE/40896347_1/w=800,h=800,fit=pad" },
    { id: 3, nombre: "Fideos  ", categoria: "abarrotes", precio: "S/ 3.20", oferta: false, img: "https://metroio.vtexassets.com/arquivos/ids/642493/Spaghetti-Don-Vittorio-500g-2-149461.jpg?v=639123897983300000" },
    { id: 4, nombre: "Azúcar  ", categoria: "abarrotes", precio: "S/ 4.10", oferta: false, img: "https://plazavea.vteximg.com.br/arquivos/ids/30578637-512-512/20283176.jpg" },
    { id: 5, nombre: "Leche ", categoria: "abarrotes", precio: "S/ 3.80", oferta: true, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoF6hYt_exnpBej2PiYtbCtJk5AAh5bW5ld1NnoJvxNA&s=10" },

    { id: 6, nombre: "Manzana ", categoria: "frutas", precio: "S/ 4.50", oferta: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDO9XDLX0XVu7HtpVOVAmb5ykWZFbOPbHUIbaWUMV_Ig&s=10" },
    { id: 7, nombre: "Plátano ", categoria: "frutas", precio: "S/ 3.00", oferta: true, img: "https://plazavea.vteximg.com.br/arquivos/ids/29450552-450-450/772631.jpg?v=639167417972170000" },
    { id: 8, nombre: "Naranja ", categoria: "frutas", precio: "S/ 2.80", oferta: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafv89zNk7NA6uuK_qVe3axG4070ZGFT7uel3LYLFbyQ&s=10" },
    { id: 9, nombre: "Mandarina ", categoria: "frutas", precio: "S/ 3.50", oferta: true, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS5tjo_F1qpUvdRJGAEneNw7eO3dOjJob696JXcawlWg&s=10" },

    { id: 10, nombre: "Detergente ", categoria: "limpieza", precio: "S/ 12.00", oferta: true, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYQL3agS7Kp4VybHKJIAV7YVPLKBIOE0VcbMvTD0b-Q&s=10" },
    { id: 11, nombre: "Lavavajilla ", categoria: "limpieza", precio: "S/ 5.50", oferta: false, img: "https://vegaperu.vtexassets.com/arquivos/ids/158544/7751851107488.jpg?v=637660221448070000" },
    { id: 12, nombre: "Lejía", categoria: "limpieza", precio: "S/ 3.90", oferta: false, img: "https://promart.vteximg.com.br/arquivos/ids/8820026/30310.jpg?v=638822446292900000" }
];

document.addEventListener("DOMContentLoaded", function () {
    const gridInicio = document.getElementById("grid-inicio");
    const gridCatalogo = document.getElementById("grid-catalogo");

    if (gridInicio) {
        mostrarProductos(productosMock.slice(0, 3), "grid-inicio");
    }
    if (gridCatalogo) {
        mostrarProductos(productosMock, "grid-catalogo");
    }
});

function mostrarProductos(lista, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    contenedor.innerHTML = "";
    lista.forEach(p => {
        contenedor.innerHTML += `
      <article class="card">
        ${p.oferta ? '<span class="badge-pulse">OFERTA</span>' : ''}
        <img src="${p.img}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p class="precio">${p.precio}</p>
        <button class="btn-cart">
          <svg class="cart-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 13H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5z"/>
          </svg>
          Agregar
        </button>
      </article>
    `;
    });
}

function filtrarProductos() {
    const categoria = document.getElementById("select-categoria").value;
    if (categoria === "todos") {
        mostrarProductos(productosMock, "grid-catalogo");
    } else {
        const filtrados = productosMock.filter(p => p.categoria === categoria);
        mostrarProductos(filtrados, "grid-catalogo");
    }
}

function guardarPedido(e) {
    e.preventDefault();

    const nuevoPedido = {
        direccion: document.getElementById("direccion").value,
        horario: document.getElementById("horario").value,
        fecha: new Date().toLocaleString()
    };

    let pedidos = JSON.parse(localStorage.getItem("pedidosDelivery")) || [];
    pedidos.push(nuevoPedido);
    localStorage.setItem("pedidosDelivery", JSON.stringify(pedidos));

    const msg = document.getElementById("mensaje-exito");
    msg.classList.add("animar");

    document.getElementById("direccion").value = "";
    document.getElementById("horario").value = "";
}

function filtrarSoloOfertas() {
  const soloOfertas = productosMock.filter(producto => producto.oferta === true);
    mostrarProductos(soloOfertas, "grid-catalogo");
}