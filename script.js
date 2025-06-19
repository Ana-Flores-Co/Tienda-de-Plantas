document.addEventListener('DOMContentLoaded', () => {
  console.log('Página cargada');
});

// Carrusel automático
document.addEventListener("DOMContentLoaded", () => {
  const carrusel = document.querySelector(".carrusel-imagenes");
  const imagenes = carrusel.querySelectorAll("img");
  let index = 0;

  function mostrarImagen() {
    imagenes.forEach((img, i) => {
      img.classList.remove("activa");
      if (i === index) img.classList.add("activa");
    });
    index = (index + 1) % imagenes.length;
  }

  mostrarImagen();
  setInterval(mostrarImagen, 3000); // Cambia cada 3 segundos
});

// Carrito de compras: actualiza total automáticamente
const carrito = document.querySelector('.carrito');
if (carrito) {
  const inputs = carrito.querySelectorAll('input[type="number"]');
  const totalElement = carrito.querySelector('p:nth-of-type(2)');
  
  function actualizarTotal() {
    let total = 0;
    inputs.forEach(input => {
      const cantidad = parseInt(input.value);
      const precioTexto = input.nextElementSibling.textContent;
      const precio = parseFloat(precioTexto.replace('Subtotal: $', ''));
      total += cantidad * (precio / cantidad); // para manejar subtotal unitario
      input.nextElementSibling.textContent = `Subtotal: $${(precio / cantidad * cantidad).toFixed(2)}`;
    });
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  inputs.forEach(input => {
    input.addEventListener('input', actualizarTotal);
  });

  actualizarTotal(); // calcular al cargar
}

// Calcular total del carrito de compras
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input[data-precio]");
  const totalDisplay = document.getElementById("total");

  function calcularTotal() {
    let total = 0;
    inputs.forEach(input => {
      const precio = parseFloat(input.getAttribute("data-precio"));
      const cantidad = parseInt(input.value) || 0;
      total += precio * cantidad;
    });
    totalDisplay.textContent = total.toFixed(2);
  }

  inputs.forEach(input => {
    input.addEventListener("input", calcularTotal);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input[data-precio]");
  const totalDisplay = document.getElementById("total");
  const pagarBtn = document.getElementById("pagar-btn");
  const mensajeError = document.getElementById("mensaje-error");
  const mensajeGracias = document.getElementById("mensaje-gracias");

  function calcularTotal() {
    let total = 0;
    inputs.forEach(input => {
      const precio = parseFloat(input.getAttribute("data-precio"));
      const cantidad = parseInt(input.value) || 0;
      total += precio * cantidad;
    });
    totalDisplay.textContent = total.toFixed(2);
    return total;
  }

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      calcularTotal();
      mensajeError.style.display = "none";
      mensajeGracias.style.display = "none";
    });
  });

  pagarBtn.addEventListener("click", () => {
  const total = calcularTotal();
  if (total === 0) {
    mensajeError.style.display = "block";
    mensajeGracias.style.display = "none";
  } else {
    mensajeError.style.display = "none";
    mensajeGracias.style.display = "block";

    // ✅ Limpiar el carrito después del pago
    inputs.forEach(input => {
      input.value = 0;
    });
    calcularTotal(); // Actualiza el total a 0
  }
});

  calcularTotal();
});

// Registro por correo
const registroForm = document.querySelector('.registro form');
if (registroForm) {
  registroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registroForm.querySelector('input[type="email"]').value;
    if (email) {
      alert(`Gracias por registrarte, ${email}`);
      registroForm.reset();
    } else {
      alert("Por favor, ingresa un correo válido.");
    }
  });
}

// Simular botón "Pagar"
const pagarBtn = carrito?.querySelector('button');
if (pagarBtn) {
  pagarBtn.addEventListener('click', () => {
    alert("Gracias por tu compra. En breve recibirás un correo con los detalles del pedido.");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("correo");
  const btnRegistrar = document.getElementById("registrar-btn");
  const msgError = document.getElementById("registro-error");
  const msgExito = document.getElementById("registro-exito");

  btnRegistrar.addEventListener("click", () => {
    const correo = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    msgError.style.display = "none";
    msgExito.style.display = "none";

    if (!correo) {
      msgError.textContent = "⚠️ Por favor ingresa tu correo electrónico.";
      msgError.style.display = "block";
    } else if (!emailRegex.test(correo)) {
      msgError.textContent = "❌ El formato del correo no es válido.";
      msgError.style.display = "block";
    } else {
      msgExito.textContent = "✅ Registro exitoso. ¡Gracias por unirte!";
      msgExito.style.display = "block";
      emailInput.value = "";
    }
  });
});