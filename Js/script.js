
const productos = [{
        id: "biobolsa 01",
        titulo: "BioBolsa Blanca",
        imagen: "./Imagenes/BioBolsas/brando-makes-branding-smTDI-z1rlY-unsplash.jpg",
        categoria: {
            nombre: "BioBolsas",
            id: "biobolsas"
        },
        precio: 800
    },
    {
        id: "biobolsa 02",
        titulo: "BioBolsa Negra",
        imagen: "./Imagenes/BioBolsas/sasha-pestano-W_QZYOVD4xY-unsplash.jpg",
        categoria: {
            nombre: "BioBolsas",
            id: "biobolsas"
        },
        precio: 800
    },
    {
        id: "maceta 01",
        titulo: "Juego de 3 macetas de 3 litros",
        imagen: "./Imagenes/Macetas/annie-spratt-IcxBbmxecEM-unsplash.jpg",
        categoria: {
            nombre: "Maceta",
            id: "macetas"
        },
        precio: 2200
    },
    {
        id: "maceta 02",
        titulo: "Juego de 2 macetas de 4 litros",
        imagen: "./Imagenes/Macetas/annie-spratt-JruJFy08KB8-unsplash.jpg",
        categoria: {
            nombre: "Maceta",
            id: "macetas"
        },
        precio: 2600
    },
    {
        id: "maceta 03",
        titulo: "Maceta 800ml",
        imagen: "./Imagenes/Macetas/gaelle-marcel-yO9ZVNFbpao-unsplash.jpg",
        categoria: {
            nombre: "Maceta",
            id: "macetas"
        },
        precio: 800
    },
    {
        id: "maceta 04",
        titulo: "Maceta 8 litros",
        imagen: "./Imagenes/Macetas/sanni-sahil-LEaK1Lmd1a8-unsplash.jpg",
        categoria: {
            nombre: "Maceta",
            id: "macetas"
        },
        precio: 800
    },
    {
        id: "Silla 01",
        titulo: "Silla estandard ",
        imagen: "./Imagenes/Sillas/vincent-botta-J41ffLK_OSM-unsplash.jpg",
        categoria: {
            nombre: "Silla",
            id: "sillas"
        },
        precio: 1500
    },
    {
        id: "Silla 02",
        titulo: "Silla estandard con patas de madera",
        imagen: "./Imagenes/Sillas/eugene-chystiakov-3neSwyntbQ8-unsplash.jpg",
        categoria: {
            nombre: "Silla",
            id: "sillas"
        },
        precio: 2600
    },
    {
        id: "Silla 03",
        titulo: "Silla superrior con patas de madera",
        imagen: "./Imagenes/Sillas/dillon-mangum-9489sFfgk4c-unsplash.jpg",
        categoria: {
            nombre: "Silla",
            id: "sillas"
        },
        precio: 3200
    },
]


const contenedorProductos = document.querySelector("#contenedorProductos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector(".titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector(".iterador-carrito")

//function: TRAIGO PRODUCTOS Al Dom
function cargarProductos(productosElegidos){
    
    contenedorProductos.innerHTML = ``; //de esta forma hago que la propiedad append añada los productos por la categoria elegida sin que se posicionen abajo de los que ya estaban
    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add(`card`);
        div.classList.add(`col-sm-12`);
        div.classList.add(`col-md-6`);
        div.classList.add(`col-lg-4`);
        div.classList.add(`col-xl-4`);
        div.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top rounded mx-auto d-block"  alt="${producto.imagen}">
            <div class="card-body">
                <h5 class="card-title">${producto.titulo}</h5>
                <p class="producto-precio">$${producto.precio}</p>
                <button id="${producto.id}" class="btn producto-agregar btn-light">Agregar a carrito</button>
            </div>
        `;
        contenedorProductos.append(div);
        
    })
    actualizarBotonesAgregar();
    
}
cargarProductos(productos);

//botones del menu: aplicar un efecto active a cada boton y aplicar un filter
botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        // botonesCategoria.forEach(boton => boton.classList.remove("active"));
        // e.currentTarget.classList.add("active");
        
        if(e.currentTarget.id != "todos"){
        const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
        tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton)
        }else{
            tituloPrincipal.innerText = "Nuestros productos"
            cargarProductos(productos);
        }
    })
})

// actualizamos botones en cada nuevo objeto que creamos 
console.log(botonesAgregar);

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}
let productosEnCarrito;
const productosEnCarritoLs = JSON.parse(localStorage.getItem("productos-en-carrito"));

if(productosEnCarritoLs){
    productosEnCarrito = productosEnCarritoLs;
    actualizarNumerito();
}else{
    productosEnCarrito = []
}

function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton); 

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    console.log(productosEnCarrito);
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}


