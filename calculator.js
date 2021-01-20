const pesoHarina = document.getElementById("pesoHarina");
const porcentajeHarina = document.getElementById("porcentajeHarina");
const tabla = document.querySelector("table");
const botonAñadir = document.getElementById("añadirIngrediente");
const botonAñadirHarina = document.getElementById("añadirHarina");
const total = document.getElementById("total");
let pesoTotalHarinas = 0;
let suma = 0;
let id = 0;
let ingredientes = [];
let harinas = [];
let idHarina = 0;

function Ingrediente(nombre, peso, porcentaje) {
  this.nombre = nombre;
  this.peso = peso;
  this.porcentaje = porcentaje;
}

function Harina(nombre, peso, porcentaje) {
  this.nombre = nombre;
  this.peso = peso;
  this.porcentaje = porcentaje;
}

function crearObjeto() {
  let nuevoObj = new Ingrediente("ingrediente", 0, 0);
  ingredientes.push(nuevoObj);
}

function crearHarina() {
  let nuevaHarina = new Harina("harina", 0, 0);
  harinas.push(nuevaHarina);
}

function añadirIngrediente() {
  let nuevoIngrediente = document.createElement("input");
  nuevoIngrediente.id = `ingrediente${id}`;
  nuevoIngrediente.placeholder = "Ingredient";
  nuevoIngrediente.className = "validate";
  nuevoIngrediente.type = "text";

  let nuevoPeso = document.createElement("input");
  nuevoPeso.id = `peso${id}`;
  nuevoPeso.placeholder = "Weight";
  nuevoPeso.className = "validate";
  nuevoPeso.type = "number";

  let nuevoPorcentaje = document.createElement("input");
  nuevoPorcentaje.id = `porcentaje${id}`;
  nuevoPorcentaje.placeholder = 0;
  nuevoPorcentaje.className = "validate porcentaje";
  nuevoPorcentaje.type = "number";

  let span = document.createElement("span");
  span.innerText = "%";
  span.className = "porcentaje-span";

  let botonDelete = document.createElement("button");
  botonDelete.innerText = "X";
  botonDelete.className =
    "botonDelete float-right btn-small waves-effect waves-light red darken-3";
  botonDelete.id = `botonDelete${id}`;

  let nuevaFila = tabla.insertRow();
  nuevaFila.id = `${id}`;

  let celda1 = nuevaFila.insertCell();
  let celda2 = nuevaFila.insertCell();
  celda2.className = "alignright";
  let celda3 = nuevaFila.insertCell();
  celda3.className = "alignright";
  let celda4 = nuevaFila.insertCell();
  celda4.className = "celdaPorcentaje";

  celda1.appendChild(nuevoIngrediente);
  celda2.appendChild(nuevoPeso);
  celda3.appendChild(nuevoPorcentaje);
  celda3.appendChild(span);
  celda4.appendChild(botonDelete);

  nuevoIngrediente.addEventListener("keyup", actualizarDatos);
  nuevoPeso.addEventListener("keyup", actualizarDatos);
  nuevoPorcentaje.addEventListener("keyup", actualizarDatos);
  nuevoPeso.addEventListener("keyup", calcularPorcentaje);
  nuevoPeso.addEventListener("keyup", calcularPesoTotal);
  nuevoPorcentaje.addEventListener("keyup", calcularPeso);
  nuevoPorcentaje.addEventListener("keyup", calcularPesoTotal);
  botonDelete.addEventListener("click", eliminarFila);
  pesoHarina.addEventListener("keyup", calcularPeso);
  pesoHarina.addEventListener("keyup", actualizarDatos);
  pesoHarina.addEventListener("keyup", calcularPesoTotal);
  pesoHarina.addEventListener("keyup", calcularPesoTotalHarina);

  crearObjeto();
  id++;
}

function añadirHarina() {
  let nuevaHarina = document.createElement("input");
  nuevaHarina.id = `harina${idHarina}`;
  nuevaHarina.placeholder = "Flour";
  nuevaHarina.className = "validate";
  nuevaHarina.type = "text";

  let nuevoPesoHarina = document.createElement("input");
  nuevoPesoHarina.id = `pesoHarina${idHarina}`;
  nuevoPesoHarina.placeholder = "Weight";
  nuevoPesoHarina.className = "validate";
  nuevoPesoHarina.type = "number";

  let nuevoPorcentajeHarina = document.createElement("input");
  nuevoPorcentajeHarina.id = `porcentajeHarina${idHarina}`;
  nuevoPorcentajeHarina.placeholder = 0;
  nuevoPorcentajeHarina.className = "validate porcentaje";
  nuevoPorcentajeHarina.type = "number";

  let span = document.createElement("span");
  span.innerText = "%";
  span.className = "porcentaje-span";

  let botonDeleteHarina = document.createElement("button");
  botonDeleteHarina.innerText = "X";
  botonDeleteHarina.className =
    "botonDelete float-right btn-small waves-effect waves-light red darken-3";
  botonDeleteHarina.id = `botonDeleteHarina${idHarina}`;

  let nuevaFila = tabla.insertRow();
  nuevaFila.id = `${idHarina}`;

  let celda1 = nuevaFila.insertCell();
  let celda2 = nuevaFila.insertCell();
  celda2.className = "alignright";
  let celda3 = nuevaFila.insertCell();
  celda3.className = "alignright";
  let celda4 = nuevaFila.insertCell();
  celda4.className = "celdaPorcentaje";

  celda1.appendChild(nuevaHarina);
  celda2.appendChild(nuevoPesoHarina);
  celda3.appendChild(nuevoPorcentajeHarina);
  celda3.appendChild(span);
  celda4.appendChild(botonDeleteHarina);

  nuevaHarina.addEventListener("keyup", actualizarDatosHarina);
  nuevoPesoHarina.addEventListener("keyup", actualizarDatos);
  nuevoPesoHarina.addEventListener("keyup", actualizarDatosHarina);
  nuevoPesoHarina.addEventListener("keyup", calcularPesoTotalHarina);
  nuevoPesoHarina.addEventListener("keyup", calcularPorcentaje);
  nuevoPesoHarina.addEventListener("keyup", calcularPorcentajeHarina);
  nuevoPesoHarina.addEventListener("keyup", calcularPesoTotal);
  nuevoPorcentajeHarina.addEventListener("keyup", actualizarDatosHarina);
  nuevoPorcentajeHarina.addEventListener("keyup", actualizarDatos);
  nuevoPorcentajeHarina.addEventListener("keyup", calcularPeso);
  nuevoPorcentajeHarina.addEventListener("keyup", calcularPesoTotal);
  botonDeleteHarina.addEventListener("click", eliminarFilaHarina);
  crearHarina();
  idHarina++;
}

function actualizarDatos() {
  for (let i = 0; i < ingredientes.length; i++) {
    if (ingredientes[i]) {
      ingredientes[i].nombre = document.getElementById(`ingrediente${i}`).value;
      if (document.getElementById(`peso${i}`).value === "") {
        ingredientes[i].peso = 0;
      } else ingredientes[i].peso = document.getElementById(`peso${i}`).value;
      ingredientes[i].porcentaje = document.getElementById(
        `porcentaje${i}`
      ).value;
    } else continue;
  }
}

function actualizarDatosHarina() {
  for (let i = 0; i < harinas.length; i++) {
    if (harinas[i]) {
      harinas[i].nombre = document.getElementById(`harina${i}`).value;
      if (document.getElementById(`pesoHarina${i}`).value === "") {
        harinas[i].peso = 0;
      } else harinas[i].peso = document.getElementById(`pesoHarina${i}`).value;
      harinas[i].porcentaje = document.getElementById(
        `porcentajeHarina${i}`
      ).value;
    } else continue;
  }
}

function calcularPeso() {
  for (let i = 0; i < ingredientes.length; i++) {
    if (ingredientes[i]) {
      document.getElementById(`peso${i}`).value = Math.round(
        (document.getElementById(`porcentaje${i}`).value * pesoTotalHarinas) /
          100
      );
    } else continue;
  }
}

function calcularPesoTotal() {
  let notNull = ingredientes.filter((a) => a !== null);
  pesoHarina.value === ""
    ? (total.innerText = notNull.reduce(
        (prev, cur) => parseInt(prev) + parseInt(cur.peso),
        0
      ))
    : (total.innerText =
        notNull.reduce((prev, cur) => parseInt(prev) + parseInt(cur.peso), 0) +
        parseInt(pesoTotalHarinas));
}

function calcularPesoTotalHarina() {
  let notNull = harinas.filter((a) => a !== null);
  pesoHarina.value === ""
    ? (pesoTotalHarinas = notNull.reduce(
        (prev, cur) => parseInt(prev) + parseInt(cur.peso),
        0
      ))
    : (pesoTotalHarinas =
        notNull.reduce((prev, cur) => parseInt(prev) + parseInt(cur.peso), 0) +
        parseInt(pesoHarina.value));
}

function calcularPorcentaje() {
  for (let i = 0; i < ingredientes.length; i++) {
    if (ingredientes[i]) {
      if (pesoHarina.value < 1 || pesoHarina.value === "") {
        document.getElementById(`porcentaje${i}`).value === "";
      } else
        document.getElementById(`porcentaje${i}`).value = parseInt(
          (document.getElementById(`peso${i}`).value / pesoTotalHarinas) * 100
        );
    } else continue;
  }
}

function calcularPorcentajeHarina() {
  for (let i = 0; i < harinas.length; i++) {
    porcentajeHarina.value = parseInt(
      (pesoHarina.value / pesoTotalHarinas) * 100
    );
    if (harinas[i]) {
      if (pesoHarina.value < 1 || pesoHarina.value === "") {
        document.getElementById(`porcentajeHarina${i}`).value === 100;
      } else {
        document.getElementById(`porcentajeHarina${i}`).value = parseInt(
          (document.getElementById(`pesoHarina${i}`).value / pesoTotalHarinas) *
            100
        );
      }
    } else continue;
  }
}

function eliminarFila(evento) {
  if (!evento.target.classList.contains("botonDelete")) {
    return;
  }

  const btn = evento.target;
  let id = btn.closest("tr").id;
  ingredientes[id] = null;
  btn.closest("tr").remove();
  calcularPesoTotal();
}

function eliminarFilaHarina(evento) {
  if (!evento.target.classList.contains("botonDelete")) {
    return;
  }

  const btn = evento.target;
  let id = btn.closest("tr").id;
  harinas[id] = null;
  btn.closest("tr").remove();
  calcularPesoTotalHarina();
  calcularPorcentajeHarina();
  calcularPorcentaje();
}

pesoHarina.addEventListener("keyup", calcularPesoTotalHarina);
pesoHarina.addEventListener("keyup", calcularPorcentajeHarina);
botonAñadirHarina.addEventListener("click", añadirHarina);
botonAñadir.addEventListener("click", añadirIngrediente);
