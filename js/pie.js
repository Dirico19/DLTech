addEventListener("load",()=>{
    const footer = document.querySelector("footer");
    fetch("./pages/pie.html")
    .then(res => res.text())
    .then(data => {
        footer.innerHTML = data;
    })
});