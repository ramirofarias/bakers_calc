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

    let nuevaFila = tabla.insertRow();
    let celda1 = nuevaFila.insertCell();
    let celda2 = nuevaFila.insertCell();
    let celda3 = nuevaFila.insertCell();

    celda1.appendChild(nuevoIngrediente)
    celda2.appendChild(nuevoPeso)
    celda3.appendChild(nuevoPorcentaje)
    celda3.appendChild(span);
    nuevoIngrediente.addEventListener("keyup", actualizarDatos)
    nuevoPeso.addEventListener("keyup", actualizarDatos)
    nuevoPorcentaje.addEventListener("keyup", actualizarDatos)
    nuevoPeso.addEventListener("keyup", calcularPorcentaje)
    nuevoPorcentaje.addEventListener("keyup", calcularPeso)

    crearObjeto();
    id++
}

function actualizarDatos(){
    for(let i = 0; i<ingredientes.length; i++){
        ingredientes[i].nombre = document.getElementById(`ingrediente${i}`).value
        ingredientes[i].peso = document.getElementById(`peso${i}`).value
        ingredientes[i].porcentaje = document.getElementById(`porcentaje${i}`).value;
    }
}

function calcularPeso(){
    for(let i = 0; i<ingredientes.length; i++){
        if(pesoHarina.value < 1 || pesoHarina.value === ""){
            document.getElementById(`peso${i}`).value === "";
        }
        else document.getElementById(`peso${i}`).value = Math.round(((document.getElementById(`porcentaje${i}`).value * pesoHarina.value)) / 100)

    }
}

function calcularPorcentaje(){
    for(let i = 0; i<ingredientes.length; i++){
        if(pesoHarina.value < 1 || pesoHarina.value === ""){
            document.getElementById(`porcentaje${i}`).value === "";
        }
        else document.getElementById(`porcentaje${i}`).value = (((document.getElementById(`peso${i}`).value / pesoHarina.value)) * 100).toFixed(2);

    }
}
    


pesoHarina.addEventListener('keyup', actualizarDatos);
pesoHarina.addEventListener('keyup', calcularPeso);
pesoHarina.addEventListener('keyup', calcularPorcentaje);
botonAñadir.addEventListener('click', añadirIngrediente);