const menubar = ()=>{
    const btn_menubar = document.querySelector(".btn-menu");
    btn_menubar.addEventListener("click",()=>{
        const nav = document.querySelector(".nav");
        nav.classList.toggle("mostrar-menu");
    })
}


const  leerLS = () => {
    const carritoNum = document.querySelector('.carrito-num');
    let productosLS = obtenerProductosLS();
    carritoNum.innerText = productosLS.length;
}

const obtenerProductosLS = () => {
    let productosLS;
    if (localStorage.getItem('productosDLTECH') === null)
    productosLS = [];
    else
    productosLS = JSON.parse(localStorage.getItem('productosDLTECH'));
    return productosLS;
}