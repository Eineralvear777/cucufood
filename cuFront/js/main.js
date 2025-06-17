import { setupGlobalListeners } from './modules/utils.js';
import { initHomePage } from './pages/home.js';
import { initLoginPage } from './pages/login.js';
import { initProfilePage } from './pages/profile.js';
import { initTopRestaurantsPage } from './pages/toprestaurants.js';

document.addEventListener('DOMContentLoaded', () => {
    setupGlobalListeners();
    const bodyId = document.body.id;
    switch (bodyId) {
        case 'home-page':
            initHomePage();
            break;
        case 'login-page':
            initLoginPage();
            break;
        case 'profile-page':
            initProfilePage();
            break;
        case 'top-restaurants-page':
            initTopRestaurantsPage();
            break;
        default:
            break;
    }
});
