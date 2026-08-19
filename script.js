const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^\d{7,10}$/;
const regexCodigo = /^\d{8}$/;

const form = document.querySelector('#formRegistro');
const lista = document.querySelector('#listaRegistros');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.querySelector('#nombre').value.trim();
  const correo = document.querySelector('#correo').value.trim();
  const telefono = document.querySelector('#telefono').value.trim();
  const edad = Number(document.querySelector('#edad').value);
  const codigo = document.querySelector('#codigo').value.trim();

  limpiarErrores();
  let valido = true;

  if (!regexNombre.test(nombre)) {
    mostrarError('errorNombre', 'Solo letras y espacios (2-50 caracteres)');
    valido = false;
  }
  if (!regexCorreo.test(correo)) {
    mostrarError('errorCorreo', 'Formato de correo inválido');
    valido = false;
  }
  if (!regexTelefono.test(telefono)) {
    mostrarError('errorTelefono', 'Debe tener entre 7 y 10 dígitos');
    valido = false;
  }
  if (isNaN(edad) || edad < 15 || edad > 100) {
    mostrarError('errorEdad', 'La edad debe estar entre 15 y 100');
    valido = false;
  }
  if (!regexCodigo.test(codigo)) {
    mostrarError('errorCodigo', 'Debe tener exactamente 8 dígitos');
    valido = false;
  }

  if (!valido) return;

  crearTarjeta({ nombre, correo, telefono, edad, codigo });
  form.reset();
});

function mostrarError(id, mensaje) {
  document.querySelector('#' + id).textContent = mensaje;
}

function limpiarErrores() {
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

function crearTarjeta(datos) {
  const tarjeta = document.createElement('article');
  tarjeta.classList.add('tarjeta');
  tarjeta.innerHTML = `
    <h3>${datos.nombre}</h3>
    <p>Correo: ${datos.correo}</p>
    <p>Teléfono: ${datos.telefono}</p>
    <p>Edad: ${datos.edad}</p>
    <p>Código: ${datos.codigo}</p>
  `;
  lista.appendChild(tarjeta);
}