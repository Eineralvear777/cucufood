import { getFeaturedRestaurants } from '../modules/api.js';
import { createElementWithClass, appendChildren } from '../modules/dom_helpers.js';

function renderRestaurantCard(restaurant) {
    const card = createElementWithClass('div', ['card']);
    const img = createElementWithClass('img', ['card__image']);
    img.src = restaurant.image || 'assets/images/placeholder.jpg';
    img.alt = restaurant.name;
    const title = createElementWithClass('h3', ['card__title']);
    title.textContent = restaurant.name;
    const description = createElementWithClass('p', ['card__description']);
    description.textContent = restaurant.description;
    const rating = createElementWithClass('span', ['card__rating']);
    rating.textContent = `⭐ ${restaurant.rating}`;
    const button = createElementWithClass('a', ['btn', 'btn--secondary', 'btn--small']);
    button.href = `#restaurant/${restaurant.id}`;
    button.textContent = 'Ver Menú';
    appendChildren(card, [img, title, description, rating, button]);
    return card;
}
async function loadFeaturedRestaurants() {
    const restaurantListDiv = document.getElementById('restaurant-list');
    if (!restaurantListDiv) return;
    restaurantListDiv.innerHTML = '<p class="loading-message">Cargando restaurantes destacados...</p>';
    try {
        const restaurants = await getFeaturedRestaurants();
        restaurantListDiv.innerHTML = '';
        if (restaurants && restaurants.length > 0) {
            const fragment = document.createDocumentFragment();
            restaurants.forEach(restaurant => {
                fragment.appendChild(renderRestaurantCard(restaurant));
            });
            restaurantListDiv.appendChild(fragment);
        } else {
            restaurantListDiv.innerHTML = '<p>No hay restaurantes destacados para mostrar.</p>';
        }
    } catch (error) {
        restaurantListDiv.innerHTML = '<p class="error-message">Error al cargar los restaurantes. Por favor, intente de nuevo más tarde.</p>';
    }
}
export function initHomePage() {
    loadFeaturedRestaurants();
    const exploreBtn = document.querySelector('.hero-section .btn--primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('featured-restaurants').scrollIntoView({ behavior: 'smooth' });
        });
    }
}
