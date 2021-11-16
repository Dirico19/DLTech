const carrito = document.querySelector('.principal');

addEventListener("load", ()=>{
    cargarCarritoLS();
    ordenCompra();
})
carrito.addEventListener("click", e =>{
    eliminarDelCarrito(e);
    subtotal(e);
    ordenCompra();
    leerLS();
})

const cargarCarritoLS = () => {
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        carrito.innerHTML += `
        <article class="car-producto">
            <div class="car-imagen"><img src="${productosLS[i].urls[0]}" alt=""></div>
            <div class="car-info">
                <div class="car-nombre">${productosLS[i].nombre}</div>
                <div class="car-precio">S/ ${Number(productosLS[i].precio).toFixed(2)}</div>
            </div>
            <div class="car-cantidad"><input type="number" name="cant" id="" value="1" min="1"></div>
            <div class="car-subtotal">S/ ${Number(productosLS[i].precio).toFixed(2)}</div>
            <div class="car-elimina"><a href="#" class="borrar"><i class="fas fa-trash-alt"></i></a></div>
            <div class="pro-id">${productosLS[i].id}</div>
        </article>
        `;
    }
}

const eliminarProductoLS = id => {
    let productosLS = obtenerProductosLS();
    for (let i = 0; i < productosLS.length; i++) {
        if (productosLS[i].id === id)
            productosLS.splice(i,1);
    }
    localStorage.setItem('productosDLTECH',JSON.stringify(productosLS));
}

const eliminarDelCarrito = e => {
    if (e.target.parentElement.classList.contains('borrar')){
        let id = e.target.parentElement.parentElement.nextElementSibling.innerText;
        e.target.parentElement.parentElement.parentElement.remove();
        eliminarProductoLS(id);
    }
}

const subtotal = e => {
    if (e.target.name == "cant"){
        let precio = e.target.parentElement.previousElementSibling.lastElementChild.innerHTML.substring(3);
        let cant = e.target.value;
        let subtotal = precio*cant;
        e.target.parentElement.nextElementSibling.innerHTML = `S/ ${subtotal.toFixed(2)}`;
    }
}

const ordenCompra = () => {
    let subtotales = document.querySelectorAll('.car-subtotal');
    let subtotal = document.querySelector('.orden-subtotal');
    let descuento = document.querySelector('.orden-descuento');
    let total = document.querySelector('.orden-total');
    let suma = 0;
    for (let i = 0; i < subtotales.length; i++) {
        suma += parseFloat(subtotales[i].innerHTML.substring(3));
    }
    let desc = 0;
    /*
    if (suma > 1000){
        desc = 0.1 * suma;
    } 
    */
    let res = suma - desc;
    subtotal.innerHTML = suma.toFixed(2);
    descuento.innerHTML = desc.toFixed(2);
    total.innerHTML = res.toFixed(2);
}