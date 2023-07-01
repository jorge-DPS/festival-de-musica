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
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// JavaScript 
const terser = require('gulp-terser-js');

function css(done) {
    src('src/scss/**/*.scss')// Identificar el archivo SASS; **/*.scss -> busca de forma recursiva todas los archivos .scss
        .pipe(sourcemaps.init())
        .pipe(plumber()) // para no detener la consola cuando tenemos un error
        .pipe(sass()) // Compilarse
        .pipe(postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
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

// Para javaScript

function javaScript(done) {
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe( terser() )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'))

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css) // aqui esta la ruta, la funcion que es css
    watch('src/js/**/*.js', javaScript)
    done();
} // en esta funcion estara a la escucha en app.scss que son los estilos 
// y para ejecutarlo usamos nopm run dev

exports.css = css;
exports.js = javaScript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(css, imagenes, versionWebp, versionAvif, javaScript, dev); // para que corra las tareas en paralelo
