const bloqueFondo = document.querySelector('.opaco');
const bloqueEspecif = document.querySelector('.pro-especificaciones');
const bloqueAlerta = document.querySelector('.alerta-añadir');

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
            article.className = `producto ${p.categoria} ${p.especificaciones.marca}`;
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
        cargarFiltrados();
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
        });
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
            bloqueAlerta.innerHTML = `
                <div class="mensaje-alerta">El producto ya se encuentra agregado en el carrito.</div>
                <button class="cerrar-alerta">Cerrar</button>
            `;
            bloqueFondo.classList.toggle("mostrar3");
            bloqueAlerta.classList.toggle("mostrar4");
            document.querySelector('.cerrar-alerta').addEventListener("click",()=>{
                bloqueFondo.classList.toggle("mostrar3");
                bloqueAlerta.classList.toggle("mostrar4");
            });
            return;
        }
    }
    bloqueAlerta.innerHTML = `
        <div class="mensaje-alerta">Producto agregado al carrito con éxito. Puede continuar.</div>
        <button class="cerrar-alerta">Cerrar</button>
    `;
    bloqueFondo.classList.toggle("mostrar3");
    bloqueAlerta.classList.toggle("mostrar4");
    document.querySelector('.cerrar-alerta').addEventListener("click",()=>{
        bloqueFondo.classList.toggle("mostrar3");
        bloqueAlerta.classList.toggle("mostrar4");
    });
    guardarProductoLS(producto);
    leerLS();
}


//FILTROS

const cargarFiltrados = () => {
    const productos = document.querySelectorAll('.producto');
    const categorias = document.querySelectorAll('.cat');
    const precioMin = document.querySelector('.precio-min');
    const precioMax = document.querySelector('.precio-max');
    const marcas = document.querySelectorAll('.mar');
    for (let i = 0; i < categorias.length; i++) {
        categorias[i].addEventListener("click", e => {
            if (e.target.classList.value.includes("activo"))
                e.target.classList.remove("activo");
            else{
                categorias.forEach(c => c.classList.remove("activo"));
                e.target.classList.add("activo");
            }
            filtroCategoria(productos);
            const arrayPro = [];
            productos.forEach(p => {
                if (p.style.display == "block") arrayPro.push(p);
            });
            filtroMarca(arrayPro);
            arrayPro.splice(0);
            productos.forEach(p => {
                if (p.style.display == "block") arrayPro.push(p);
            });
            filtroPrecio(arrayPro);
        });
    }
    for (let i = 0; i < marcas.length; i++) {
        marcas[i].addEventListener("click", e => {
            if (e.target.classList.value.includes("activo"))
                e.target.classList.remove("activo");
            else{
                marcas.forEach(m => m.classList.remove("activo"));
                e.target.classList.add("activo");
            }
            filtroMarca(productos);
            const arrayPro = [];
            productos.forEach(p => {
                if (p.style.display == "block") arrayPro.push(p);
            });
            filtroCategoria(arrayPro);
            arrayPro.splice(0);
            productos.forEach(p => {
                if (p.style.display == "block") arrayPro.push(p);
            });
            filtroPrecio(arrayPro);
        });
    }
    precioMin.addEventListener("keyup", () => {
        filtroPrecio(productos);
        const arrayPro = [];
        productos.forEach(p => {
            if (p.style.display == "block") arrayPro.push(p);
        });
        filtroCategoria(arrayPro);
        arrayPro.splice(0);
        productos.forEach(p => {
            if (p.style.display == "block") arrayPro.push(p);
        });
        filtroMarca(arrayPro);
    });
    precioMax.addEventListener("keyup", () => {
        filtroPrecio(productos);
        const arrayPro = [];
        productos.forEach(p => {
            if (p.style.display == "block") arrayPro.push(p);
        });
        filtroCategoria(arrayPro);
        arrayPro.splice(0);
        productos.forEach(p => {
            if (p.style.display == "block") arrayPro.push(p);
        });
        filtroMarca(arrayPro);
    });

    const filtroCategoria = productos => {
        let cat = "";
        categorias.forEach(c => {
            if (c.classList.value.includes("activo")) cat = c.innerText.toLowerCase();
        });
        productos.forEach(p => {
            if (cat == "") p.style.display = "block";
            else if (p.classList[1].toLowerCase() == cat) p.style.display = "block";
            else p.style.display = "none";
        })
    }
    const filtroMarca = productos => {
        let mar = "";
        marcas.forEach(m => {
            if (m.classList.value.includes("activo")) mar = m.innerText.toLowerCase();
        });
        productos.forEach(p => {
            if (mar == "") p.style.display = "block";
            else if (p.classList[2].toLowerCase() == mar) p.style.display = "block";
            else p.style.display = "none";
        })
    }
    const filtroPrecio = productos => {
        let min = parseInt(precioMin.value);
        let max = parseInt(precioMax.value);
        if (isNaN(min)) min = 0;
        if (isNaN(max) || max < min) max = 1000000;
        productos.forEach(p => {
            let precio = Number(p.firstElementChild.nextElementSibling.nextElementSibling.innerText.substring(3));
            if (precio>=min && precio<=max) p.style.display = "block";
            else p.style.display = "none";
        });
    }
}