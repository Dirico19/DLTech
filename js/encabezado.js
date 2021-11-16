addEventListener("load",()=>{
    const header = document.querySelector("header");
    fetch("./pages/encabezado.html")
    .then(res => res.text())
    .then(data => {
        header.innerHTML = data;
        menubar();
        leerLS();
    })
});

