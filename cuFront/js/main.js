// cuFront/js/main.js
import { setupGlobalListeners } from './modules/utils.js';
import { initHomePage } from './pages/home.js';
import { initLoginPage } from './pages/login.js'; // Login ahora maneja modales
import { initProfilePage } from './pages/profile.js';
import { initTopRestaurantsPage } from './pages/toprestaurants.js';
import { initAuthUIListeners, updateAuthUI } from './modules/auth_ui.js'; // Nuevo módulo para UI de autenticación
import { setupLocationIcons } from './modules/map_modals.js'; // Nuevo módulo para modales de mapa

document.addEventListener('DOMContentLoaded', () => {
    // Escuchadores globales (como el toggle del menú de hamburguesa)
    setupGlobalListeners();

    // Inicializar UI de autenticación al cargar (mostrar/ocultar botón de login/perfil)
    initAuthUIListeners(); // Se encarga de los listeners de los menús de usuario
    updateAuthUI(); // Actualiza el estado visible del perfil/login al cargar

    // Inicialización de página específica
    const bodyId = document.body.id;
    switch (bodyId) {
        case 'home-page':
            initHomePage();
            break;
        case 'login-page': // Aunque login.html es una página, su lógica es para modales. Mantener esto aquí o solo llamar a initLoginPage() si login.html sigue siendo una página dedicada.
            initLoginPage();
            break;
        case 'profile-page':
            initProfilePage();
            break;
        case 'top-restaurants-page':
            initTopRestaurantsPage();
            break;
        default:
            // Para otras páginas o si el bodyId no coincide con ninguna específica
            break;
    }

    // Como los íconos de ubicación y los modales de login/registro son globales
    // y pueden aparecer en varias páginas (home, topres), los inicializamos siempre.
    // Esto es crucial para que los iconos de ubicación abran el modal del mapa.
    // Los listeners para los modales de login/registro se inicializan con initLoginPage.
    setupLocationIcons(); // Aseguramos que los iconos de ubicación funcionen en cualquier página.
});