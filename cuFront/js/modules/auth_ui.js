// cuFront/js/modules/auth_ui.js
import { getLocalStorageItem, removeLocalStorageItem } from './utils.js';

// --- Elementos del Header ---
const loginBtnHeader = document.getElementById('login-button-header');
const userMenuHeader = document.getElementById('user-profile-menu-header');
const profileUsernameHeader = document.getElementById('profile-username-header');
const profileEmailHeader = document.getElementById('profile-email-header');
const profileIconBtnHeader = document.getElementById('profile-icon-btn-header');
const profileDropdownHeader = document.getElementById('profile-dropdown-header');
const logoutBtnHeader = document.getElementById('logout-btn-header');

// --- Elementos del Footer (si existen, de topres.html) ---
const userMenuContainerFooter = document.getElementById('user-menu-container-footer');
const userMenuButtonFooter = document.getElementById('user-menu-button-footer');
const footerProfileFoto = document.getElementById('footer-profile-foto');
const footerProfileIcon = document.getElementById('footer-profile-icon');
const userDropdownFooter = document.getElementById('user-dropdown-footer');
const logoutBtnFooter = document.getElementById('logout-btn-footer');

/**
 * Muestra el menú de perfil de usuario y oculta el botón de login.
 * @param {object} usuario - Objeto con los datos del usuario (nombre, email, fotoPerfil).
 */
function showProfileUI(usuario) {
    // Header
    if (loginBtnHeader) loginBtnHeader.style.display = 'none';
    if (userMenuHeader) userMenuHeader.classList.remove('hidden');
    if (profileUsernameHeader) profileUsernameHeader.textContent = usuario.name || 'Usuario';
    if (profileEmailHeader) profileEmailHeader.textContent = usuario.email || 'correo@ejemplo.com';

    // Footer
    if (userMenuContainerFooter) {
        userMenuContainerFooter.classList.remove('hidden');
        if (usuario.avatar && footerProfileFoto) {
            footerProfileFoto.src = usuario.avatar;
            footerProfileFoto.classList.remove('hidden');
            if (footerProfileIcon) footerProfileIcon.classList.add('hidden');
        } else {
            if (footerProfileFoto) footerProfileFoto.classList.add('hidden');
            if (footerProfileIcon) footerProfileIcon.classList.remove('hidden');
        }
    }
}

/**
 * Oculta el menú de perfil de usuario y muestra el botón de login.
 */
function hideProfileUI() {
    // Header
    if (loginBtnHeader) loginBtnHeader.style.display = ''; // Restaurar display original
    if (userMenuHeader) userMenuHeader.classList.add('hidden');

    // Footer
    if (userMenuContainerFooter) userMenuContainerFooter.classList.add('hidden');
}

/**
 * Actualiza la interfaz de usuario de autenticación basándose en el estado de localStorage.
 */
export function updateAuthUI() {
    const user = getLocalStorageItem('currentUser');
    if (user) {
        showProfileUI(user);
    } else {
        hideProfileUI();
    }
}


/**
 * Maneja el cierre de sesión.
 */
function handleLogout() {
    removeLocalStorageItem('userToken');
    removeLocalStorageItem('currentUser');
    // Forzar la actualización de la UI
    updateAuthUI();
    // Opcional: Recargar la página o redirigir al inicio
    // window.location.href = 'index.html';
}

/**
 * Inicializa los event listeners para la UI de autenticación.
 */
export function initAuthUIListeners() {
    // Dropdown de perfil en el Header
    if (profileIconBtnHeader && profileDropdownHeader) {
        profileIconBtnHeader.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que se cierre por el evento click del documento
            profileDropdownHeader.classList.toggle('hidden');
        });
        document.addEventListener('click', function(e) {
            if (profileDropdownHeader && !profileDropdownHeader.classList.contains('hidden') && !profileIconBtnHeader.contains(e.target)) {
                profileDropdownHeader.classList.add('hidden');
            }
        });
        profileDropdownHeader.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que se cierre al hacer click dentro del dropdown
        });
    }

    // Botones de cerrar sesión
    if (logoutBtnHeader) {
        logoutBtnHeader.addEventListener('click', handleLogout);
    }
    if (logoutBtnFooter) {
        logoutBtnFooter.addEventListener('click', handleLogout);
    }

    // Dropdown de perfil en el Footer (si existe)
    if (userMenuButtonFooter && userDropdownFooter) {
        userMenuButtonFooter.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdownFooter.classList.toggle('hidden');
        });
        document.addEventListener('click', function(e) {
            if (userDropdownFooter && !userDropdownFooter.classList.contains('hidden') && !userMenuButtonFooter.contains(e.target)) {
                userDropdownFooter.classList.add('hidden');
            }
        });
        userDropdownFooter.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }


    // Sincronizar el estado de la UI de autenticación al cargar la página
    updateAuthUI();

    // Escuchar cambios en localStorage para sincronizar UI entre pestañas/páginas
    window.addEventListener('storage', function(e) {
        if (e.key === 'currentUser') {
            updateAuthUI();
        }
    });
}

// Asegurarse de que `createElementWithClass` exista si se usa aquí (actualmente no lo hace, pero es buena práctica)
// import { createElementWithClass } from './dom_helpers.js';