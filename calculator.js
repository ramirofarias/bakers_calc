const pesoHarina = document.getElementById("pesoHarina");
const porcentajeHarina = document.getElementById("porcentajeHarina");
const tabla = document.querySelector("table");
const botonAñadir = document.getElementById("añadirIngrediente");
const botonAñadirHarina = document.getElementById("añadirHarina");
const total = document.getElementById("total");
let pesoTotalHarinas = 0;
let suma = 0;
let id = 0;
let idHarina = 0;
let ingredientes = [];
let harinas = [];

class Ingrediente {
  constructor(nombre, peso, porcentaje) {
    this.nombre = nombre;
    this.peso = peso;
    this.porcentaje = porcentaje;
  }
}

class Harina {
  constructor(nombre, peso, porcentaje) {
    this.nombre = nombre;
    this.peso = peso;
    this.porcentaje = porcentaje;
  }
}

const crearObjeto = () => {
  let nuevoObj = new Ingrediente("ingrediente", 0, 0);
  ingredientes.push(nuevoObj);
};

const crearHarina = () => {
  let nuevaHarina = new Harina("Harina", 0, 0);
  harinas.push(nuevaHarina);
};

const añadirIngrediente = () => {
  let markup = new Markup();
  markup.crearHTML();
  crearObjeto();
  id++;
};
const añadirHarina = () => {
  let markupHarina = new MarkupHarina();
  markupHarina.crearHTMLHarina();
  crearHarina();
  idHarina++;
};

class Markup {
  crearHTML() {
    let nuevoIngrediente = crearInputIngrediente(id, "", "Ingredient");
    let nuevoPeso = crearInputPeso(id, "");
    let nuevoPorcentaje = crearInputPorcentaje(id, "");
    let span = crearSpanPorcentaje();
    let botonDelete = crearBotonDelete(id, "");
    let { celda1, celda2, celda3, celda4 } = crearNuevaFila();

    celda1.appendChild(nuevoIngrediente);
    celda2.appendChild(nuevoPeso);
    celda3.appendChild(nuevoPorcentaje);
    celda3.appendChild(span);
    celda4.appendChild(botonDelete);

    this.añadirEventListeners(
      nuevoIngrediente,
      nuevoPeso,
      nuevoPorcentaje,
      botonDelete
    );
  }

  añadirEventListeners(
    nuevoIngrediente,
    nuevoPeso,
    nuevoPorcentaje,
    botonDelete
  ) {
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
  }
}

class MarkupHarina {
  crearHTMLHarina() {
    let nuevaHarina = crearInputIngrediente(idHarina, "Harina", "Flour");
    let nuevoPesoHarina = crearInputPeso(idHarina, "Harina");
    let nuevoPorcentajeHarina = crearInputPorcentaje(idHarina, "Harina");
    let span = crearSpanPorcentaje();
    let botonDeleteHarina = crearBotonDelete(idHarina, "Harina");
    let { celda1, celda2, celda3, celda4 } = crearNuevaFila();

    celda1.appendChild(nuevaHarina);
    celda2.appendChild(nuevoPesoHarina);
    celda3.appendChild(nuevoPorcentajeHarina);
    celda3.appendChild(span);
    celda4.appendChild(botonDeleteHarina);

    this.añadirEventListenersHarina(
      nuevaHarina,
      nuevoPesoHarina,
      nuevoPorcentajeHarina,
      botonDeleteHarina
    );
  }

  añadirEventListenersHarina(
    nuevaHarina,
    nuevoPesoHarina,
    nuevoPorcentajeHarina,
    botonDeleteHarina
  ) {
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
  }
}

const crearInputIngrediente = (idNum, tipo, placeholder) => {
  let nuevoIngrediente = document.createElement("input");
  nuevoIngrediente.id = `ingrediente${tipo}${idNum}`;
  nuevoIngrediente.placeholder = placeholder;
  nuevoIngrediente.className = "validate";
  nuevoIngrediente.type = "text";
  return nuevoIngrediente;
};

const crearInputPeso = (idNum, tipo) => {
  let nuevoPeso = document.createElement("input");
  nuevoPeso.id = `peso${tipo}${idNum}`;
  nuevoPeso.placeholder = "Weight";
  nuevoPeso.className = "validate";
  nuevoPeso.type = "number";
  return nuevoPeso;
};
const crearInputPorcentaje = (idNum, tipo) => {
  let nuevoPorcentaje = document.createElement("input");
  nuevoPorcentaje.id = `porcentaje${tipo}${idNum}`;
  nuevoPorcentaje.placeholder = 0;
  nuevoPorcentaje.className = "validate porcentaje";
  nuevoPorcentaje.type = "number";
  return nuevoPorcentaje;
};

const crearSpanPorcentaje = () => {
  let span = document.createElement("span");
  span.innerText = "%";
  span.className = "porcentaje-span";
  return span;
};
const crearBotonDelete = (idNum, tipo) => {
  let botonDelete = document.createElement("button");
  botonDelete.innerText = "X";
  botonDelete.className =
    "botonDelete float-right btn-small waves-effect waves-light red darken-3";
  botonDelete.id = `botonDelete${tipo}${idNum}`;
  return botonDelete;
};
const crearNuevaFila = () => {
  let nuevaFila = tabla.insertRow();
  nuevaFila.id = `${idHarina}`;
  let celda1 = nuevaFila.insertCell();
  let celda2 = nuevaFila.insertCell();
  celda2.className = "alignright";
  let celda3 = nuevaFila.insertCell();
  celda3.className = "alignright";
  let celda4 = nuevaFila.insertCell();
  celda4.className = "celdaPorcentaje";
  return { celda1, celda2, celda3, celda4 };
};

const actualizarDatos = () => {
  for (let i = 0; i < ingredientes.length; i++) {
    if (ingredientes[i]) {
      ingredientes[i].nombre = document.getElementById(`ingrediente${i}`).value;
      if (inputPesoEstaVacio(i)) {
        ingredientes[i].peso = 0;
      } else tomarValoresDeInputYGuardarlosEnObjeto(i);
    } else continue;
  }
};

const actualizarDatosHarina = () => {
  for (let i = 0; i < harinas.length; i++) {
    if (harinas[i]) {
      harinas[i].nombre = document.getElementById(
        `ingredienteHarina${i}`
      ).value;
      if (document.getElementById(`pesoHarina${i}`).value === "") {
        harinas[i].peso = 0;
      } else harinas[i].peso = document.getElementById(`pesoHarina${i}`).value;
      harinas[i].porcentaje = document.getElementById(
        `porcentajeHarina${i}`
      ).value;
    } else continue;
  }
};

const calcularPeso = () => {
  for (let i = 0; i < ingredientes.length; i++) {
    if (ingredientes[i]) {
      document.getElementById(`peso${i}`).value = Math.round(
        (document.getElementById(`porcentaje${i}`).value * pesoTotalHarinas) /
          100
      );
    } else continue;
  }
};

const calcularPesoTotal = () => {
  let notNull = ingredientes.filter((a) => a !== null);
  if (pesoHarina.value === "") {
    total.innerText = notNull.reduce(
      (prev, cur) => parseInt(prev) + parseInt(cur.peso),
      0
    );
  } else {
    total.innerText =
      notNull.reduce((prev, cur) => parseInt(prev) + parseInt(cur.peso), 0) +
      parseInt(pesoTotalHarinas);
  }
};

const calcularPesoTotalHarina = () => {
  let notNull = harinas.filter((a) => a !== null);
  if (pesoHarina.value === "") {
    pesoTotalHarinas = notNull.reduce(
      (prev, cur) => parseInt(prev) + parseInt(cur.peso),
      0
    );
  } else {
    pesoTotalHarinas =
      notNull.reduce((prev, cur) => parseInt(prev) + parseInt(cur.peso), 0) +
      parseInt(pesoHarina.value);
  }
};

const calcularPorcentaje = () => {
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
};

const calcularPorcentajeHarina = () => {
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
};

const eliminarFila = (evento) => {
  if (!evento.target.classList.contains("botonDelete")) {
    return;
  }

  const btn = evento.target;
  let id = btn.closest("tr").id;
  ingredientes[id] = null;
  btn.closest("tr").remove();
  calcularPesoTotal();
};

const eliminarFilaHarina = (evento) => {
  if (!evento.target.classList.contains("botonDelete")) {
    return;
  }
  const btn = evento.target;
  let id = btn.closest("tr").id;
  harinas[id] = null;
  btn.closest("tr").remove();
  calcularPesoTotal();
  calcularPesoTotalHarina();
  calcularPorcentajeHarina();
  calcularPorcentaje();
};

function inputPesoEstaVacio(i) {
  return document.getElementById(`peso${i}`).value === "";
}

const tomarValoresDeInputYGuardarlosEnObjeto = (i) => {
  ingredientes[i].peso = document.getElementById(`peso${i}`).value;
  ingredientes[i].porcentaje = document.getElementById(`porcentaje${i}`).value;
};

pesoHarina.addEventListener("keyup", calcularPesoTotalHarina);
pesoHarina.addEventListener("keyup", calcularPesoTotal);

pesoHarina.addEventListener("keyup", calcularPorcentajeHarina);
botonAñadirHarina.addEventListener("click", añadirHarina);
botonAñadir.addEventListener("click", añadirIngrediente);
