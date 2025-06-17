import { loginUser } from '../modules/api.js';
import { isValidEmail, isValidPassword, showMessage, setLocalStorageItem } from '../modules/utils.js';

async function handleLoginFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector('#email');
    const passwordInput = form.querySelector('#password');
    const messageArea = document.getElementById('login-message');
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    if (!isValidEmail(email)) {
        showMessage(messageArea, 'Por favor, introduce un correo electrónico válido.', 'error');
        return;
    }
    if (!isValidPassword(password, 6)) {
        showMessage(messageArea, 'La contraseña debe tener al menos 6 caracteres.', 'error');
        return;
    }
    showMessage(messageArea, 'Iniciando sesión...', 'info', 0);
    try {
        const data = await loginUser(email, password);
        if (data.success) {
            setLocalStorageItem('userToken', data.token);
            setLocalStorageItem('currentUser', data.user);
            showMessage(messageArea, data.message, 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showMessage(messageArea, data.message || 'Error desconocido al iniciar sesión.', 'error');
        }
    } catch (error) {
        showMessage(messageArea, error.message || 'Hubo un problema al iniciar sesión. Intenta de nuevo.', 'error');
    }
}
export function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginFormSubmit);
    }
}
