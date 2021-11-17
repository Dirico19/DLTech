const bloqueFondo = document.querySelector('.opaco');
const bloqueAlerta = document.querySelector('.alerta-contacto');

document.frm.addEventListener("submit", e => registrar(e));

const nombre = document.frm.nombre;
nombre.addEventListener("keypress",e => {
    if (/\d/.test(e.key)){
        e.preventDefault();
        return;
    }
});

const telefono = document.frm.telefono;
telefono.addEventListener("keypress",e => {
    if (/\D/.test(e.key)){
        e.preventDefault();
        return;
    }
});
const correo = document.frm.correo;
const asunto = document.frm.asunto;
const mensaje = document.frm.mensaje;

const registrar = e => {
    e.preventDefault()
    if (/^\s*$/.test(nombre.value)){
        bloqueAlerta.innerHTML = `
            <div class="mensaje-alerta">Escriba un nombre.</div>
            <button class="cerrar-alerta">Cerrar</button>
        `;
        bloqueFondo.classList.toggle("mostrar1");
        bloqueAlerta.classList.toggle("mostrar2");
        document.querySelector('.cerrar-alerta').addEventListener("click",()=>{
            bloqueFondo.classList.toggle("mostrar1");
            bloqueAlerta.classList.toggle("mostrar2");
        });
        return;
    }
    if (!/^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}$/.test(correo.value)){
        bloqueAlerta.innerHTML = `
            <div class="mensaje-alerta">Escriba un email válido.</div>
            <button class="cerrar-alerta">Cerrar</button>
        `;
        bloqueFondo.classList.toggle("mostrar1");
        bloqueAlerta.classList.toggle("mostrar2");
        document.querySelector('.cerrar-alerta').addEventListener("click",()=>{
            bloqueFondo.classList.toggle("mostrar1");
            bloqueAlerta.classList.toggle("mostrar2");
        });
        return;
    }
    if (!/^[1-9]\d{8,14}$/.test(telefono.value)){
        bloqueAlerta.innerHTML = `
            <div class="mensaje-alerta">Número de teléfono/celular incorrecto.</div>
            <button class="cerrar-alerta">Cerrar</button>
        `;
        bloqueFondo.classList.toggle("mostrar1");
        bloqueAlerta.classList.toggle("mostrar2");
        document.querySelector('.cerrar-alerta').addEventListener("click",()=>{
            bloqueFondo.classList.toggle("mostrar1");
            bloqueAlerta.classList.toggle("mostrar2");
        });
        return;
    }
    if (/^\s*$/.test(asunto.value)){
        bloqueAlerta.innerHTML = `
            <div class="mensaje-alerta">Escriba un asunto.</div>
            <button class="cerrar-alerta">Cerrar</button>
        `;
        bloqueFondo.classList.toggle("mostrar1");
        bloqueAlerta.classList.toggle("mostrar2");
        document.querySelector('.cerrar-alerta').addEventListener("click",()=>{
            bloqueFondo.classList.toggle("mostrar1");
            bloqueAlerta.classList.toggle("mostrar2");
        });
        return;
    }
    if (/^\s*$/.test(mensaje.value)){
        bloqueAlerta.innerHTML = `
            <div class="mensaje-alerta">Escriba un mensaje.</div>
            <button class="cerrar-alerta">Cerrar</button>
        `;
        bloqueFondo.classList.toggle("mostrar1");
        bloqueAlerta.classList.toggle("mostrar2");
        document.querySelector('.cerrar-alerta').addEventListener("click",()=>{
            bloqueFondo.classList.toggle("mostrar1");
            bloqueAlerta.classList.toggle("mostrar2");
        });
        return;
    }
    bloqueAlerta.innerHTML = `
        <div class="mensaje-alerta">Su consulta ha sido enviada. Pronto alguien se pondrá en contacto con usted.</div>
        <button class="cerrar-alerta">Cerrar</button>
    `;
    bloqueFondo.classList.toggle("mostrar1");
    bloqueAlerta.classList.toggle("mostrar2");
    document.querySelector('.cerrar-alerta').addEventListener("click",()=>{
        bloqueFondo.classList.toggle("mostrar1");
        bloqueAlerta.classList.toggle("mostrar2");
        location.href = "./contacto.html";
    });
}