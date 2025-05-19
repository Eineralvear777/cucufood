document.querySelector('.voice-btn').addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.start();

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        document.querySelector('input').value = result;
    };

    recognition.onerror = (event) => {
        alert('Error al reconocer voz: ' + event.error);
    };
});
/* detalles login*/
function toggleLogin() {
    const loginPage = document.getElementById("loginPage");
    const overlay = document.getElementById("overlay");
    const visible = loginPage.style.display === "block";
  
    loginPage.style.display = visible ? "none" : "block";
    overlay.style.display = visible ? "none" : "block";
  
    if (!visible) showLoginForm(); // mostrar login por defecto
  }
  
  function closeLogin() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
  
  function showRegisterForm() {
    document.querySelector(".register-form").style.display = "block";
    document.querySelector(".login-form").style.display = "none";
  }
  
  function showLoginForm() {
    document.querySelector(".register-form").style.display = "none";
    document.querySelector(".login-form").style.display = "block";
  }
  
  /* Detalles de seleccion de precio */

  document.addEventListener('DOMContentLoaded', function() {
    const budgetSelect = document.getElementById('budget');
    const customBudget = document.getElementById('custom-budget');
    
    budgetSelect.addEventListener('change', function() {
        if (this.value === 'personalizado') {
            customBudget.classList.remove('hidden');
        } else {
            customBudget.classList.add('hidden');
        }
    });
});

/* detalles Lugares */

function mostrarRuta(direccion) {
  const modal = document.getElementById("map-modal");
  const mapa = document.getElementById("map-frame");
  const encoded = encodeURIComponent(direccion);
  mapa.src = `https://www.google.com/maps?q=${encoded}&output=embed`;
  modal.style.display = "block";
}

function cerrarMapa() {
  const modal = document.getElementById("map-modal");
  const mapa = document.getElementById("map-frame");
  modal.style.display = "none";
  mapa.src = ""; // Limpia el iframe para evitar múltiples cargas
}


// resaltado//
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const resaltado = params.get("resaltado");

  if (resaltado) {
    const elemento = document.getElementById(resaltado);
    if (elemento) {
      elemento.classList.add("resaltado");
      elemento.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

