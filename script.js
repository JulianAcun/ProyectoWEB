const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^\d{7,10}$/;
const regexCodigo = /^\d{8}$/;

const form = document.querySelector('#formRegistro');
const lista = document.querySelector('#listaRegistros');
const CLAVE_STORAGE = 'tekio_clientes';

// Cargar registros guardados al abrir la página
document.addEventListener('DOMContentLoaded', cargarRegistros);

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
  if (isNaN(edad) || edad
