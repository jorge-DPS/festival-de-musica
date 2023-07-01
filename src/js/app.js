document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
})

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

//Begin:: Navegacion Fija
function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const fijarBody = document.querySelector('body');


    window.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            barra.classList.add('fijo');
            fijarBody.classList.add('no-scroll-body')

        } else {
            barra.classList.remove('fijo');
            fijarBody.classList.remove('no-scroll-body');
        }
    });
}
//End:: Navegacion fija

//Begin:: Nav scroll efecto
function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        })
    })
}
//End:: Nav scroll efecto

// Begin:: Imagenes
function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg"
                alt="imagen galeria">
        `;

        imagen.onclick = function () { // para identificar a que imgaen le hacemos click, lo hacemos de eta forma
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    };
}

function mostrarImagen(id_imagen) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id_imagen}.avif" type="image/avif">
        <source srcset="build/img/grande/${id_imagen}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id_imagen}.jpg"
                alt="imagen galeria">
    `;

    // Crea el overlay con la imagen
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.appendChild(imagen);
    overlay.onclick = function () {
        // la function arrow, sirve para hacer mas acciones en el evento
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }

    // Boton ṕara cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    }
    overlay.appendChild(cerrarModal)


    // Añadirlo al HTML
    const body = document.querySelector('body')
    body.appendChild(overlay);
    body.classList.add('fijar-body')
}