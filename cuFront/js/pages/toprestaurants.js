import { getTopRestaurants } from '../modules/api.js';
import { createElementWithClass, appendChildren } from '../modules/dom_helpers.js';

function renderTopRestaurantItem(restaurant) {
    const item = createElementWithClass('div', ['top-restaurant-item']);
    const img = createElementWithClass('img', ['top-restaurant-item__image']);
    img.src = restaurant.image || 'assets/images/placeholder-top.jpg';
    img.alt = restaurant.name;
    const name = createElementWithClass('h3', ['top-restaurant-item__name']);
    name.textContent = restaurant.name;
    const description = createElementWithClass('p', ['top-restaurant-item__description']);
    description.textContent = restaurant.description;
    const rating = createElementWithClass('span', ['top-restaurant-item__rating']);
    rating.textContent = `⭐ ${restaurant.rating}`;
    const button = createElementWithClass('a', ['btn', 'btn--primary', 'top-restaurant-item__button']);
    button.href = `#restaurant/${restaurant.id}`;
    button.textContent = 'Ver Menú';
    appendChildren(item, [img, name, description, rating, button]);
    return item;
}
async function loadTopRestaurants() {
    const topRestaurantsListDiv = document.getElementById('top-restaurants-list');
    if (!topRestaurantsListDiv) return;
    topRestaurantsListDiv.innerHTML = '<p class="loading-message">Cargando los mejores restaurantes...</p>';
    try {
        const restaurants = await getTopRestaurants();
        topRestaurantsListDiv.innerHTML = '';
        if (restaurants && restaurants.length > 0) {
            const fragment = document.createDocumentFragment();
            restaurants.forEach(restaurant => {
                fragment.appendChild(renderTopRestaurantItem(restaurant));
            });
            topRestaurantsListDiv.appendChild(fragment);
        } else {
            topRestaurantsListDiv.innerHTML = '<p>No hay restaurantes TOP para mostrar en este momento.</p>';
        }
    } catch (error) {
        topRestaurantsListDiv.innerHTML = '<p class="error-message">Error al cargar los restaurantes. Por favor, intente de nuevo más tarde.</p>';
    }
}
export function initTopRestaurantsPage() {
    loadTopRestaurants();
}
