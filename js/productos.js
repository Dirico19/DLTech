const bloqueFondo = document.querySelector('.opaco');
const bloqueEspecif = document.querySelector('.pro-especificaciones');

addEventListener("load",()=>{
    cargarProductos();
})
const cargarProductos = ()=>{
    const principal = document.querySelector(".cuerpo-principal")
    fetch("./docs/productos.json")
    .then(res => res.json())
    .then(data => {
        for (const p of data) {
            const article = document.createElement("article");
            article.className = "producto";
            article.innerHTML = `
                <img class="pro-imagen" src="${p.urls[0]}">
                <p class="pro-nombre">${p.nombre}</p>
                <p class="pro-precio">S/ ${Number(p.precio).toFixed(2)}</p>
                <button class="pro-añadir">Añadir al <i class="fas fa-shopping-cart"></i></button>
                <div class="pro-id">${p.id}</div>
            `;
            principal.appendChild(article);
        }
        cargarEspecificacionesPro(data);
    });
}
const cargarBloqueEspecif = ()=>{
    bloqueFondo.classList.toggle("mostrar1");
    bloqueEspecif.classList.toggle("mostrar2");
}

const cargarEspecificacionesPro = (data)=>{
    const btnAñadir = document.querySelectorAll('.pro-añadir');
    for (let i = 0; i < btnAñadir.length; i++) {
        btnAñadir[i].addEventListener("click", e =>{
            let id;
            if (e.target.tagName == "BUTTON")
                id = e.target.nextElementSibling.innerText;
            else if (e.target.tagName == "I")
                id = e.target.parentElement.nextElementSibling.innerText;
            let nombre = data[id-1].nombre;
            const imgUrl = data[id-1].urls;
            let precio = data[id-1].precio;
            let categoria = data[id-1].categoria;
            const especif = data[id-1].especificaciones;
            let cadenaEsp = "";
            for (const esp in especif) {
                cadenaEsp += `<div class="esp-1">${esp}</div>
                <div class="esp-2">:</div>
                <div class="esp-3">${especif[esp]}</div>`;
            }
            bloqueEspecif.innerHTML = `
                <div class="pro-cerrar"><span class="material-icons-outlined">close</span></div>
                <img class="especif-imagen" src="${imgUrl[0]}">
                <div class="especif-info">
                    <p class="especif-nombre">${nombre}</p>
                    <p class="especif-precio">S/ ${Number(precio).toFixed(2)}</p>
                    <div class="especif-especificaciones">
                        <h4>Especificaciones Técnicas</h4>
                        <div>${cadenaEsp}</div>
                    </div>
                    <button class="especif-añadir">Añadir al <i class="fas fa-shopping-cart"></i></button>
                </div>
            `;
            cargarBloqueEspecif();
            document.querySelector('.pro-cerrar').addEventListener("click",()=> cargarBloqueEspecif());
            document.querySelector('.especif-añadir').addEventListener("click",()=> agregarAlCarrito(id,nombre,imgUrl,precio,categoria,especif));
        })
    }
}

const guardarProductoLS = producto => {
    let productosLS = obtenerProductosLS();
    productosLS.push(producto);
    localStorage.setItem('productosDLTECH',JSON.stringify(productosLS));
}

const eliminarProductoLS = id => {
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        if (productosLS[i].id === id)
            productosLS.splice(i,1);
    }
    localStorage.setItem('productosDLTECH',JSON.stringify(productosLS));
}

const agregarAlCarrito = (id, nom, imgU, prec, cat, esp) => {
    const producto = {
        id: id,
        nombre: nom,
        urls: imgU,
        precio: prec,
        categoria: cat,
        especificaciones: esp
    };
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        if (productosLS[i].id === producto.id){
            alert("El producto ya está agregado al carrito");
            return;
        }
    }
    guardarProductoLS(producto);
    leerLS();
}