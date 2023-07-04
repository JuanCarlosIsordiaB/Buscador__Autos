//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');

//Sacar año actual
const max = new Date().getFullYear(); //Da el año en el que estamos
const min = max - 10; //Minimo de años

//Generar un objeto con la busqueda
const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos); //Muestra los autos

  //Llena las opciones de años
  llenarSelect();
});

//Event listener para los select de búsqueda

marca.addEventListener('change', (e) => {
  datosBusqueda.marca = e.target.value; // e.target.value - Dato Seleccionado
  filtrarAuto();
});

year.addEventListener('change', (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});

minimo.addEventListener('change', (e) => {
  datosBusqueda.minimo = parseInt(e.target.value);
  filtrarAuto();
});

maximo.addEventListener('change', (e) => {
  datosBusqueda.maximo = parseInt(e.target.value);
  filtrarAuto();
});

puertas.addEventListener('change', (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});

transmision.addEventListener('change', (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener('change', (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

//Funciones
//De donde agarra a datosBusqueda
function mostrarAutos(autos) {
  limpiarHTML(); //Elimina el HTML previo

  autos.forEach(auto => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto; //Para eliminar auto.sub-objeto
    const autoHTML = document.createElement('p');

    autoHTML.textContent = `
      ${marca}  - ${modelo} - ${year} - ${puertas} Puertas - Transmisión ${transmision} - Precio: $${precio} - Color:${color}
    `;

    //Insertar en el html
    resultado.appendChild(autoHTML);
  });
}

//Limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Genera los años del select
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i; //Ingres el value del HTML
    opcion.textContent = i; //Ingresa el contenido en HTML
    year.appendChild(opcion); //Agrega las opciones de año al select 
  }
}

//Funcion que filtra en base a la búsqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinPrecio)
    .filter(filtrarMaxPrecio)
    .filter(filtrarPuertas)
    .filter(filtararTransmision)
    .filter(filtararColor);

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
  
}

function noResultado(){
    limpiarHTML();
    const error =  document.createElement('p');
    error.textContent = 'No hay resultados';
    error.classList.add('error', 'alerta');
    resultado.appendChild(error);
}

//Filtra autos por marca
function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return auto;
}

function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === datosBusqueda.year;
  }
  return auto;
}

function filtrarMinPrecio(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= datosBusqueda.minimo;
  }
  return auto;
}

function filtrarMaxPrecio(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= datosBusqueda.maximo;
  }
  return auto;
}


function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtararTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtararColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}