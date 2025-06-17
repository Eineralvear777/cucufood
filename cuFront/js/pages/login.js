// cuFront/js/pages/login.js
import { loginUser } from '../modules/api.js'; // Asumo que aún usas esta función para la API
import { isValidEmail, isValidPassword, showMessage, setLocalStorageItem } from '../modules/utils.js';
import { updateAuthUI } from '../modules/auth_ui.js'; // Importamos la nueva función para actualizar la UI de autenticación

// Elementos del modal
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeLoginButton = document.getElementById('close-login-modal');
const closeRegisterButton = document.getElementById('close-register-modal');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// Formularios
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Mensajes (usamos el elemento global si existe, o creamos uno para los modales si no)
const loginMessageArea = loginModal ? loginModal.querySelector('.message-area') || createElementWithClass('div', ['message-area']) : null;
if (loginMessageArea && !loginMessageArea.parentElement) {
    if (loginForm) loginForm.parentElement.appendChild(loginMessageArea);
}
const registerMessageArea = registerModal ? registerModal.querySelector('.message-area') || createElementWithClass('div', ['message-area']) : null;
if (registerMessageArea && !registerMessageArea.parentElement) {
    if (registerForm) registerForm.parentElement.appendChild(registerMessageArea);
}


/**
 * Abre un modal específico y cierra el otro.
 * @param {HTMLElement} modalToOpen - El modal que se va a abrir.
 * @param {HTMLElement} [modalToClose=null] - El modal que se va a cerrar.
 */
function openModal(modalToOpen, modalToClose = null) {
    if (modalToOpen) {
        modalToOpen.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evitar scroll en el body
    }
    if (modalToClose) {
        modalToClose.style.display = 'none';
    }
}

/**
 * Cierra un modal específico y restaura el scroll del body.
 * @param {HTMLElement} modalToClose - El modal que se va a cerrar.
 */
function closeModal(modalToClose) {
    if (modalToClose) {
        modalToClose.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
        // Limpiar mensajes al cerrar
        if (loginMessageArea) showMessage(loginMessageArea, '', 'info', 0);
        if (registerMessageArea) showMessage(registerMessageArea, '', 'info', 0);
    }
}

async function handleLoginFormSubmit(event) {
    event.preventDefault();
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!isValidEmail(email)) {
        showMessage(loginMessageArea, 'Por favor, introduce un correo electrónico válido.', 'error');
        return;
    }
    if (!isValidPassword(password, 6)) { // La contraseña debe tener al menos 6 caracteres.
        showMessage(loginMessageArea, 'La contraseña debe tener al menos 6 caracteres.', 'error');
        return;
    }

    showMessage(loginMessageArea, 'Iniciando sesión...', 'info', 0);
    try {
        const data = await loginUser(email, password); // Usa la función de API real
        if (data.success) {
            setLocalStorageItem('userToken', data.token);
            setLocalStorageItem('currentUser', data.user);
            showMessage(loginMessageArea, data.message, 'success');
            // Actualiza la UI de autenticación en el header y footer
            updateAuthUI();
            setTimeout(() => {
                closeModal(loginModal);
                // Opcional: recargar la página o redirigir
                // window.location.href = 'index.html';
            }, 1000);
        } else {
            showMessage(loginMessageArea, data.message || 'Error desconocido al iniciar sesión.', 'error');
        }
    } catch (error) {
        showMessage(loginMessageArea, error.message || 'Hubo un problema al iniciar sesión. Intenta de nuevo.', 'error');
    }
}

function handleRegisterFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm-password').value.trim();
    const termsAccepted = document.getElementById('terms').checked;

    if (!name) {
        showMessage(registerMessageArea, 'Por favor, introduce tu nombre.', 'error');
        return;
    }
    if (!isValidEmail(email)) {
        showMessage(registerMessageArea, 'Por favor, introduce un correo electrónico válido.', 'error');
        return;
    }
    if (!isValidPassword(password, 6)) {
        showMessage(registerMessageArea, 'La contraseña debe tener al menos 6 caracteres.', 'error');
        return;
    }
    if (password !== confirmPassword) {
        showMessage(registerMessageArea, 'Las contraseñas no coinciden.', 'error');
        return;
    }
    if (!termsAccepted) {
        showMessage(registerMessageArea, 'Debes aceptar los Términos y Condiciones.', 'error');
        return;
    }

    showMessage(registerMessageArea, 'Registrando usuario...', 'info', 0);
    // Simulación de registro exitoso, reemplazar con una llamada a la API real
    // Ejemplo: registerUser(name, email, password) desde modules/api.js
    setTimeout(() => {
        // En un caso real, aquí iría la llamada a tu API de registro
        // Si el registro es exitoso:
        showMessage(registerMessageArea, '¡Registro exitoso! Ahora puedes iniciar sesión.', 'success');
        // Para simular, guardamos el usuario en localStorage al registrar
        setLocalStorageItem('currentUser', { name: name, email: email });
        updateAuthUI(); // Actualiza la UI de autenticación si es necesario
        setTimeout(() => {
            openModal(loginModal, registerModal); // Vuelve al modal de login
            showMessage(registerMessageArea, '', 'info', 0); // Limpiar mensaje del modal de registro
        }, 1500);
    }, 1000);
}

export function initLoginPage() {
    // Escuchar clicks en botones/enlaces que abren modales
    // Para el botón "Iniciar Sesión" del header
    const loginButtonHeader = document.getElementById('login-button-header');
    if (loginButtonHeader) {
        loginButtonHeader.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModal);
        });
    }

    // Para cualquier otro botón con id 'login-button' o 'login-button-footer' (como en el footer de topres.html)
    const allLoginButtons = document.querySelectorAll('#login-button, #login-button-footer');
    allLoginButtons.forEach(btn => {
        if (btn) { // Verificar si el elemento existe
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(loginModal);
            });
        }
    });


    // Cerrar modal de login
    if (closeLoginButton) {
        closeLoginButton.addEventListener('click', () => closeModal(loginModal));
    }

    // Cerrar modal de registro
    if (closeRegisterButton) {
        closeRegisterButton.addEventListener('click', () => closeModal(registerModal));
    }

    // Cambiar a registro desde login
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(registerModal, loginModal);
        });
    }

    // Cambiar a login desde registro
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(loginModal, registerModal);
        });
    }

    // Cerrar modales al hacer click fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === registerModal) {
            closeModal(registerModal);
        }
    });

    // Event listeners para los formularios
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginFormSubmit);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterFormSubmit);
    }
}