const pesoHarina = document.getElementById('pesoHarina');
const tabla = document.querySelector('table');
const botonAñadir = document.getElementById('añadirIngrediente');
let id = 0;
let ingredientes = [];

function Ingrediente(nombre, peso, porcentaje){
    this.nombre = nombre;
    this.peso = peso;
    this.porcentaje = porcentaje;
}

function crearObjeto(){
    var nuevoObj = new Ingrediente("prueba", "prueba1", "prueba2");
    ingredientes.push(nuevoObj);
}

function añadirIngrediente(){
    let nuevoIngrediente = document.createElement("input");
        nuevoIngrediente.id = `ingrediente${id}`;
        nuevoIngrediente.placeholder = "Ingredient";

    let nuevoPeso = document.createElement("input");
        nuevoPeso.id = `peso${id}`;
        nuevoPeso.placeholder = "Weight";
        nuevoPeso.type ="number";

    let nuevoPorcentaje = document.createElement("input");
        nuevoPorcentaje.id = `porcentaje${id}`;
        nuevoPorcentaje.placeholder = "%";
        nuevoPorcentaje.type ="number";

    let span = document.createElement("span");
        span.innerText = "%";

    var botonDelete = document.createElement("button");
        botonDelete.innerText = "X";
        botonDelete.className = "botonDelete";
        botonDelete.id = `botonDelete${id}`;

    let nuevaFila = tabla.insertRow();
        nuevaFila.id = `${id}`
        
    let celda1 = nuevaFila.insertCell();
    let celda2 = nuevaFila.insertCell();
    let celda3 = nuevaFila.insertCell();

    celda1.appendChild(nuevoIngrediente)
    celda2.appendChild(nuevoPeso)
    celda3.appendChild(nuevoPorcentaje)
    celda3.appendChild(span);
    celda3.appendChild(botonDelete)
    ;
    nuevoIngrediente.addEventListener("keyup", actualizarDatos)
    nuevoPeso.addEventListener("keyup", actualizarDatos)
    nuevoPorcentaje.addEventListener("keyup", actualizarDatos)
    nuevoPeso.addEventListener("keyup", calcularPorcentaje)
    nuevoPorcentaje.addEventListener("keyup", calcularPeso)
    botonDelete.addEventListener("click", onDeleteRow)

    crearObjeto();
    id++
}

function actualizarDatos(){
    for(let i = 0; i<ingredientes.length; i++){
        if(!ingredientes[i] || !document.getElementById(`ingrediente${i}`).value) continue;
        else{
        ingredientes[i].nombre = document.getElementById(`ingrediente${i}`).value
        ingredientes[i].peso = document.getElementById(`peso${i}`).value
        ingredientes[i].porcentaje = document.getElementById(`porcentaje${i}`).value;}
    }
}

function calcularPeso(){
    for(let i = 0; i<ingredientes.length; i++){
        if(!ingredientes[i]) continue;
        else{
             document.getElementById(`peso${i}`).value = Math.round(((document.getElementById(`porcentaje${i}`).value * pesoHarina.value)) / 100)

    }}
}

function calcularPorcentaje(){
    for(let i = 0; i<ingredientes.length; i++){
        if(!ingredientes[i]) continue;
        else{
        if(pesoHarina.value < 1 || pesoHarina.value === ""){
            document.getElementById(`porcentaje${i}`).value === "";
        }
        else document.getElementById(`porcentaje${i}`).value = (((document.getElementById(`peso${i}`).value / pesoHarina.value)) * 100).toFixed(2);
    }
    }
}
    
function onDeleteRow(e) {
    if (!e.target.classList.contains("botonDelete")) {
      return;
    }

    const btn = e.target;
    let id = btn.closest("tr").id
    ingredientes[id] = null;
    btn.closest("tr").remove();
  }

pesoHarina.addEventListener('keyup', actualizarDatos);
pesoHarina.addEventListener('keyup', calcularPeso);
pesoHarina.addEventListener('keyup', calcularPorcentaje);
botonAñadir.addEventListener('click', añadirIngrediente);