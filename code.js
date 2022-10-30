'use strict'

let ajax;
let url;
window.addEventListener("load", inicia, false)

function inicia() {
    let botonMuestra = document.querySelector('#enviar')
    botonMuestra.addEventListener('click', () => {
        borraContenidos()
        solicitudAjax()
    }, false);
}

function checkUrl() {
    let url = document.querySelector('#recurso').value;
    if (/^\s*$/.test(url)) {
        alert('La URL no puede estar vacía');
        return
    }else if (!/^.*\.[a-z0-9]{1,4}$/gi.test(url)) {
        alert('Vaya... parce que la URL no es correcta');
        return
    }
    return url;
}


function solicitudAjax() {
    let urlOk = checkUrl();
    ajax = new XMLHttpRequest();//Instanciamos XHR
    ajax.addEventListener("load", mostrar, false); //Se lanza al completarse con éxito
    ajax.addEventListener("loadend", final, false);//Se lanza al completar la solicitud
    ajax.addEventListener("readystatechange", cambio, false);//Se lanza cuando cambia el valor de la propiedad readyState
    ajax.open("GET", urlOk, true);//Método GET, recupera el fichero documento.txt
    ajax.send();//Método SEND, como es GET está vacío. Inicia la solicitud AJAX
}

function borraContenidos() {
    let divs =document.querySelectorAll('#contenidos, #estados, #codigo')
    divs.forEach(element => {
        element.innerHTML="";
    });
    
}


function mostrar(e) {
    let resultado = document.querySelector("#contenidos");
    let p = document.createElement('p');
    if (ajax.status == 404) {
        p.appendChild(document.createTextNode("Error archivo no encontrado"))
        p.style.color = 'red'
        resultado.appendChild(p);
        return;
    }
    p.appendChild(document.createTextNode(e.target.responseText))
    resultado.appendChild(p);


}

function cambio() {
    let estadoPeticion = document.querySelector('#estados');
    let p = document.createElement('p');
    switch (ajax.readyState) {
        case 0:
            p.appendChild(document.createTextNode(ajax.readyState + ': petición no iniciada'))
            break;
        case 1:
            p.appendChild(document.createTextNode(ajax.readyState + ': Conexión al servidor establecida'))
            break;
        case 2:
            p.appendChild(document.createTextNode(ajax.readyState + ': petición recibida'))
            break;
        case 3:
            p.appendChild(document.createTextNode(ajax.readyState + ': procesando petición'))
            break;
        case 4:
            p.appendChild(document.createTextNode(ajax.readyState + ': petición finalizada, respuesta preparda'))
            break;
    
        default:
            p.appendChild(document.createTextNode(ajax.readyState))
            break;
    }
    
    estadoPeticion.appendChild(p);
}
function final() {
    let codigoEstado = document.querySelector('#codigo');
    let p = document.createElement('p');
    switch (ajax.status) {
        case 200:
            p.appendChild(document.createTextNode(ajax.status + ': OK'))
            break;
        case 403:
            p.appendChild(document.createTextNode(ajax.status + ': Prohibido'))
            break;
        case 404:
            p.appendChild(document.createTextNode(ajax.status + ': No encontrado'))
            break;
        default:
            p.appendChild(document.createTextNode(ajax.status + ': No encontrado'))
            break;
    }
    codigoEstado.appendChild(p);
}