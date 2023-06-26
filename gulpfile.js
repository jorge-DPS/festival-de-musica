// function tarea( callback ) {
//     //tarea
//     console.log('mi primera tarea');
//     callback();
// }

// exports.tarea = tarea; // se llama del lado izquierdo en este caso es exports.tarea

// word-flow; asi se llama este documento que sirve para compilar y hacer watch
const { src, dest, watch, parallel } = require("gulp"); // src sirve para identificar un archivo y dest para guardar

// CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber')

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif')

function css(done) {
    src('src/scss/**/*.scss')// Identificar el archivo SASS; **/*.scss -> busca de forma recursiva todas los archivos .scss
        .pipe(plumber()) // para no detener la consola cuando tenemos un error
        .pipe(sass()) // Compilarse
        .pipe(dest('build/css'));// Almacenarla en el disco duro

    done(); // Callback que avisa a gulp cuando llegamos al final
}

//imagemin
// hacen que las imagenes sean mas lijeros
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}') // este codigo se encarga de buscar todas las imganes que tengan estos formatos
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done()
}

function versionWebp(done) {

    //opciones de webp
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') // este codigo se encarga de buscar todas las imganes que tengan estos formatos
        .pipe(webp(opciones))
        .pipe(dest('build/img')) // para guardarlo en el disco duro
    done()
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done()
}

function dev(done) {
    watch('src/scss/**/*.scss', css) // aqui esta la ruta, la funcion que es css
    done();
} // en esta funcion estara a la escucha en app.scss que son los estilos 
// y para ejecutarlo usamos nopm run dev

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev); // para que corra las tareas en paralelo
