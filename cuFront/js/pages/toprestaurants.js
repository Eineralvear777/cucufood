// cuFront/js/pages/toprestaurants.js
import { getTopRestaurants } from '../modules/api.js';
import { createElementWithClass, appendChildren } from '../modules/dom_helpers.js';
import { setupLocationIcons } from '../modules/map_modals.js'; // Importamos la función para los iconos de ubicación

function renderTopRestaurantItem(restaurant) {
    const item = createElementWithClass('div', ['restaurant-card', 'bg-white', 'rounded-xl', 'overflow-hidden', 'shadow-lg', 'relative']);
    
    // Contenedor de la imagen
    const imgContainer = createElementWithClass('div', ['img-top-container', 'relative']);
    const img = createElementWithClass('img', ['top-card-img-topres']); // Clase para la imagen dentro de la tarjeta
    img.src = restaurant.image || 'assets/images/placeholder-top.jpg'; // Usar la ruta de imagen del dato o placeholder
    img.alt = restaurant.name;
    
    // Etiquetas de precio y rating (con clases de Tailwind)
    const priceTag = createElementWithClass('div', ['absolute', 'top-0', 'left-0', 'bg-gray-800', 'bg-opacity-80', 'text-white', 'px-3', 'py-1', 'rounded-br-lg', 'z-10', 'text-xs', 'font-bold']);
    priceTag.textContent = restaurant.priceTag || '$$$'; // Asumo que restaurant.priceTag existe o un default
    
    const ratingBadge = createElementWithClass('div', ['absolute', 'top-0', 'right-0', 'bg-orange-500', 'text-white', 'px-3', 'py-1', 'rounded-bl-lg', 'z-10', 'text-xs', 'font-bold', 'flex', 'items-center']);
    ratingBadge.innerHTML = `⭐ ${restaurant.rating}`;

    appendChildren(imgContainer, [img, priceTag, ratingBadge]);

    // Contenido de la tarjeta
    const contentDiv = createElementWithClass('div', ['p-6', 'relative']);
    const headerDiv = createElementWithClass('div', ['flex', 'justify-between', 'items-center', 'mb-2']);
    
    const name = createElementWithClass('h3', ['fancy-title', 'text-xl', 'font-bold', 'mb-2']); // Clase fancy-title para el título
    name.textContent = restaurant.name;

    const statusSpan = createElementWithClass('span', ['text-sm', 'py-1', 'px-2', 'rounded']);
    statusSpan.textContent = restaurant.isOpen ? 'Abierto' : 'Cerrado';
    // FIX: Corrección del typo y la sintaxis para añadir clases condicionalmente
    if (restaurant.isOpen) {
        statusSpan.classList.add('bg-green-100', 'text-green-800');
    } else {
        statusSpan.classList.add('bg-red-100', 'text-red-800');
    } // Linea corregida, ver screenshot.
    
    appendChildren(headerDiv, [name, statusSpan]);

    const description = createElementWithClass('p', ['text-gray-600', 'mb-4', 'descripcion-card']);
    description.textContent = restaurant.description;

    const locationDiv = createElementWithClass('div', ['flex', 'items-center', 'text-sm', 'text-gray-500', 'mb-2']);
    const locationSvg = createElementWithClass('svg', ['w-4', 'h-4', 'mr-1', 'location-icon', 'cursor-pointer']);
    locationSvg.setAttribute('fill', 'none');
    locationSvg.setAttribute('stroke', 'currentColor');
    locationSvg.setAttribute('viewBox', '0 0 24 24');
    if (restaurant.mapUrl) {
        locationSvg.setAttribute('data-map', restaurant.mapUrl);
    } else {
        locationSvg.setAttribute('data-map', restaurant.location);
    }
    locationSvg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />';
    
    const locationSpan = createElementWithClass('span');
    locationSpan.textContent = restaurant.location;
    appendChildren(locationDiv, [locationSvg, locationSpan]);

    const menuButton = createElementWithClass('button', ['menu-btn', 'absolute', 'right-6', 'bottom-6']);
    menuButton.textContent = 'Menú';

    appendChildren(contentDiv, [headerDiv, description, locationDiv, menuButton]);
    appendChildren(item, [imgContainer, contentDiv]);
    return item;
}

async function loadTopRestaurants() {
    const topRestaurantsListDiv = document.getElementById('top-restaurants-list');
    const containerForRestaurants = document.querySelector('#restaurantes-top .grid'); 

    if (!containerForRestaurants) {
        console.error('Contenedor de restaurantes TOP no encontrado en la página.');
        return;
    }

    containerForRestaurants.innerHTML = '<p class="loading-message">Cargando los mejores restaurantes...</p>';
    try {
        const restaurants = await getTopRestaurants();

        containerForRestaurants.innerHTML = '';

        if (restaurants && restaurants.length > 0) {
            const fragment = document.createDocumentFragment();
            restaurants.forEach(restaurant => {
                fragment.appendChild(renderTopRestaurantItem(restaurant));
            });
            containerForRestaurants.appendChild(fragment);
            setupLocationIcons(); // Llama a la función de inicialización de iconos de ubicación
        } else {
            containerForRestaurants.innerHTML = '<p>No hay restaurantes TOP para mostrar en este momento.</p>';
        }
    } catch (error) {
        containerForRestaurants.innerHTML = '<p class="error-message">Error al cargar los restaurantes. Por favor, intente de nuevo más tarde.</p>';
    }
}

export function initTopRestaurantsPage() {
    loadTopRestaurants();
}