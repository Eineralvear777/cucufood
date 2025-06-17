// cuFront/js/pages/home.js
import { getFeaturedRestaurants } from '../modules/api.js'; // Mantenemos esta importación si aún se usa en alguna parte (aunque el nuevo HTML las hardcodea en 'Lo Más Top')
import { createElementWithClass, appendChildren } from '../modules/dom_helpers.js';
import { setupGlobalListeners } from '../modules/utils.js'; // Aseguramos que la configuración global de listeners se mantenga

// Datos de categorías (movido desde inicio_script.js)
const categorias = [
  {
    nombre: 'Pizzerías',
    emoji: '🍕',
    descripcion: 'Las mejores pizzerías artesanales y de cadena en tu ciudad.',
    lugares: 42,
    color: 'bg-red-100',
    minPrecio: 80,
    tipo: 'Pizzería',
  },
  {
    nombre: 'Hamburguesas',
    emoji: '🍔',
    descripcion: 'Hamburguesas gourmet, clásicas y para todos los gustos.',
    lugares: 38,
    color: 'bg-yellow-100',
    minPrecio: 120,
    tipo: 'Hamburguesas',
  },
  {
    nombre: 'Sushi',
    emoji: '🍣',
    descripcion: 'Sushi fresco, rolls y comida japonesa.',
    lugares: 24,
    color: 'bg-blue-100',
    minPrecio: 200,
    tipo: 'Japonesa',
  },
  {
    nombre: 'Saludable',
    emoji: '🥗',
    descripcion: 'Opciones saludables, vegetarianas y veganas.',
    lugares: 31,
    color: 'bg-green-100',
    minPrecio: 150,
    tipo: 'Saludable',
  },
  {
    nombre: 'Cafeterías',
    emoji: '☕',
    descripcion: 'Cafés, repostería y espacios para relajarte.',
    lugares: 47,
    color: 'bg-brown-100',
    minPrecio: 60,
    tipo: 'Cafetería',
  },
  {
    nombre: 'Bares',
    emoji: '🍷',
    descripcion: 'Bares, coctelerías y lugares para salir de noche.',
    lugares: 29,
    color: 'bg-purple-100',
    minPrecio: 180,
    tipo: 'Bar',
  },
  {
    nombre: 'Mexicana',
    emoji: '🌮',
    descripcion: 'Tacos, burritos y auténtica comida mexicana.',
    lugares: 35,
    color: 'bg-orange-100',
    minPrecio: 90,
    tipo: 'Mexicana',
  },
  {
    nombre: 'Postres',
    emoji: '🍦',
    descripcion: 'Helados, pasteles y dulces para consentirte.',
    lugares: 26,
    color: 'bg-pink-100',
    minPrecio: 50,
    tipo: 'Postres',
  },
];

// Datos de restaurantes (movido desde inicio_script.js y extendido con data de topres.html si aplica)
const restaurants = [
    {
        name: "La Trattoria",
        type: "Italiana",
        rating: 4.9,
        priceTag: "$$$",
        priceRange: [450, 600],
        image: "img/goat.jpg",
        location: "Centro, a 1.2 km",
        description: "Cocina italiana auténtica con los mejores ingredientes importados",
        isOpen: true
    },
    {
        name: "Sushi Master",
        type: "Japonesa",
        rating: 4.8,
        priceTag: "$$$$",
        priceRange: [700, 950],
        image: "img/mbp.jpg",
        location: "Zona Norte, a 2.5 km",
        description: "La mejor experiencia de sushi con pescado fresco diariamente",
        isOpen: true
    },
    {
        name: "Green Life",
        type: "Saludable",
        rating: 4.7,
        priceTag: "$$",
        priceRange: [250, 350],
        image: "img/spezia.jpg",
        location: "Parque Central, a 0.8 km",
        description: "Comida saludable, orgánica y deliciosa para todos los gustos",
        isOpen: true
    },
    {
        name: "Burger House",
        type: "Hamburguesas",
        rating: 4.6,
        priceTag: "$$",
        priceRange: [180, 300],
        image: "img/mbp.jpg",
        location: "Avenida Principal, a 1.5 km",
        description: "Las mejores hamburguesas gourmet de la ciudad",
        isOpen: true
    },
    {
        name: "Pizza Express",
        type: "Pizzería",
        rating: 4.5,
        priceTag: "$",
        priceRange: [120, 200],
        image: "img/goat.jpg", // img cambiado a image para consistencia
        location: "Plaza Central, a 0.5 km",
        description: "Pizzas artesanales con masa fresca todos los días",
        isOpen: true
    },
    {
        name: "Taco Loco",
        type: "Mexicana",
        rating: 4.7,
        priceTag: "$",
        priceRange: [80, 150],
        image: "img/goat.jpg",
        location: "Calle 45, a 1.8 km",
        description: "Auténtica comida mexicana con recetas tradicionales",
        isOpen: false
    },
    {
        name: "Café Parisien",
        type: "Cafetería",
        rating: 4.4,
        priceTag: "$$",
        priceRange: [150, 250],
        image: "img/spezia.jpg",
        location: "Zona Cultural, a 1.0 km",
        description: "Café de especialidad y pasteles artesanales",
        isOpen: true
    },
    {
        name: "El Asador",
        type: "Parrilla",
        rating: 4.8,
        priceTag: "$$$",
        priceRange: [400, 600],
        image: "img/spezia.jpg",
        location: "Avenida Norte, a 3.2 km",
        description: "Los mejores cortes de carne a la parrilla",
        isOpen: true
    },
    {
        name: "Sushi Económico",
        type: "Japonesa",
        rating: 4.2,
        priceTag: "$",
        priceRange: [100, 180],
        image: "img/spezia.jpg",
        location: "Centro Comercial, a 2.0 km",
        description: "Sushi de calidad a precios accesibles",
        isOpen: true
    },
    {
        name: "Luxury Dining",
        type: "Alta Cocina",
        rating: 4.9,
        priceTag: "$$$$$",
        priceRange: [800, 1500],
        image: "img/spezia.jpg",
        location: "Zona Exclusiva, a 4.5 km",
        description: "Experiencia gastronómica de lujo con chef premiado",
        isOpen: true
    },
    {
        name: "Bar Central",
        type: "Bar",
        rating: 4.5,
        priceTag: "$$$",
        priceRange: [200, 400],
        image: "img/goat.jpg",
        location: "Zona Rosa, a 1.1 km",
        description: "Cócteles de autor y ambiente nocturno único.",
        isOpen: true
    },
    {
        name: "La Dulcería",
        type: "Postres",
        rating: 4.8,
        priceTag: "$",
        priceRange: [50, 120],
        image: "img/goat.jpg",
        location: "Centro, a 0.6 km",
        description: "Tartas, helados y postres artesanales irresistibles.",
        isOpen: true
    }
];

// AGREGA MUCHOS RESTAURANTES A LA CATEGORÍA PIZZERÍAS (manteniendo la lógica original)
for (let i = 1; i <= 15; i++) {
  restaurants.push({
    name: `Pizza Fantástica ${i}`,
    type: "Pizzería",
    rating: (4 + Math.random()).toFixed(1),
    priceTag: i % 3 === 0 ? "$$$" : i % 2 === 0 ? "$$" : "$",
    priceRange: [80 + i * 5, 120 + i * 10],
    image: `img/pizza${(i % 3) + 1}.jpg`, // Usar imágenes de ejemplo o genéricas
    location: `Barrio ${i}, a ${(0.5 + i * 0.2).toFixed(1)} km`,
    description: `Pizzería artesanal con ingredientes frescos y variedad de sabores. Sucursal #${i}`,
    isOpen: i % 4 !== 0
  });
}

// Selección de elementos del DOM (movido desde inicio_script.js)
const mobileMenuButton = document.getElementById('menu-toggle'); // Usamos el ID del toggle del header actual
const mobileMenu = document.querySelector('.main-nav'); // El menú móvil es la misma nav principal

const priceRange = document.getElementById('price-range');
const selectedPrice = document.getElementById('selected-price');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const resultsContainer = document.getElementById('results-container');
const resultsSummary = document.getElementById('results-summary');
const noResults = document.getElementById('no-results');

const categoriaCards = document.querySelectorAll('#lugares .card-hover');
const lugaresSection = document.getElementById('lugares');
const categoriaDetalle = document.getElementById('categoria-detalle');
const volverCategorias = document.getElementById('volver-categorias');
const categoriaEmoji = document.getElementById('categoria-emoji');
const categoriaNombre = document.getElementById('categoria-nombre');
const categoriaDescripcion = document.getElementById('categoria-descripcion');
const categoriaLugares = document.getElementById('categoria-lugares');
const categoriaListado = document.getElementById('categoria-listado');

// Helper function to get emoji based on restaurant type (movido desde inicio_script.js)
function getEmojiForType(type) {
    const emojiMap = {
        'Italiana': '🍕',
        'Japonesa': '🍣',
        'Saludable': '🥗',
        'Hamburguesas': '🍔',
        'Pizzería': '🍕',
        'Mexicana': '🌮',
        'Cafetería': '☕',
        'Parrilla': '🥩',
        'Alta Cocina': '🍷',
        'Bar': '🍸',
        'Postres': '🍰'
    };
    return emojiMap[type] || '🍽️';
}

// Search function (movido desde inicio_script.js)
function performSearch() {
    const budget = parseInt(priceRange.value);
    const query = searchInput.value.toLowerCase();

    const filteredResults = restaurants.filter(restaurant => {
        const matchesBudget = restaurant.priceRange[0] <= budget;
        const matchesQuery = query === '' ||
            restaurant.name.toLowerCase().includes(query) ||
            restaurant.type.toLowerCase().includes(query) ||
            restaurant.description.toLowerCase().includes(query);
        return matchesBudget && matchesQuery;
    });
    filteredResults.sort((a, b) => a.priceRange[0] - b.priceRange[0]);
    displayResults(filteredResults, budget);
}

// Display search results (movido desde inicio_script.js)
function displayResults(results, budget) {
    resultsContainer.innerHTML = '';
    resultsSummary.textContent = `Mostrando opciones con presupuesto de hasta $${budget}`;
    if (results.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        results.forEach(restaurant => {
            const card = createElementWithClass('div', ['bg-white', 'rounded-xl', 'shadow-md', 'overflow-hidden', 'transition', 'duration-300', 'card-hover']);
            let imgHtml = '';
            if ((restaurant.image && restaurant.image.match(/^img\//))) { // Asumo 'image' es la propiedad correcta para la ruta de la imagen
                const imgSrc = restaurant.image;
                imgHtml = `<div class=\"img-top-container relative\"><img src=\"${imgSrc}\" alt=\"${restaurant.name}\" class=\"top-card-img-topres\" /></div>`;
            } else {
                let cat = categorias.find(c => restaurant.type && c.tipo && restaurant.type.toLowerCase().includes(c.tipo.toLowerCase()));
                let bgColor = restaurant.image && restaurant.image.startsWith('bg-') ? restaurant.image : (cat ? cat.color : 'bg-gray-100');
                let emoji = cat ? cat.emoji : getEmojiForType(restaurant.type);
                imgHtml = `<div class=\"img-top-container flex items-center justify-center ${bgColor}\" style=\"height: 12rem;\"><span class=\"text-7xl\">${emoji}</span></div>`;
            }
            let locationHTML = `<svg class=\"w-4 h-4 mr-1 location-icon cursor-pointer\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z\" /><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 11a3 3 0 11-6 0 3 3 0 016 0z\" /></svg>`;
            card.innerHTML = `
                ${imgHtml}
                <div class=\"p-6\">
                    <div class=\"flex justify-between items-center mb-2\">
                        <h3 class=\"text-xl font-bold\">${restaurant.name}</h3>
                        <span class=\"text-sm ${restaurant.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} py-1 px-2 rounded\">${restaurant.isOpen ? 'Abierto' : 'Cerrado'}</span>
                    </div>
                    <p class=\"text-gray-600 mb-4 descripcion-card\">${restaurant.description}</p>
                    <div class=\"flex items-center text-sm text-gray-500 mb-2">
                        ${locationHTML}<span>${restaurant.location}</span>
                    </div>
                    <div class=\"footer-categoria\">
                        <span class=\"precio-categoria\">$${restaurant.priceRange[0]}-${restaurant.priceRange[1]}</span>
                        <button class=\"menu-btn\">Menú</button>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
        // Reaplicar funcionalidad a los nuevos íconos
        // setupLocationIcons(); // Esta función se exportará del nuevo módulo map_modals.js
    }
    searchResults.classList.remove('hidden');
    searchResults.scrollIntoView({ behavior: 'smooth' });
}

// Filtra por tipo para cada categoría (movido desde inicio_script.js)
function mostrarCategoria(idx) {
  const cat = categorias[idx];
  categoriaEmoji.textContent = cat.emoji;
  categoriaNombre.textContent = cat.nombre;
  categoriaDescripcion.textContent = cat.descripcion;
  categoriaLugares.textContent = `${cat.lugares} lugares · Desde $${cat.minPrecio}`;

  const lugares = restaurants.filter(r => {
    return r.type && r.type.toLowerCase().includes(cat.tipo.toLowerCase());
  });

  categoriaListado.innerHTML = '';
  if (lugares.length === 0) {
    categoriaListado.innerHTML = '<div class="col-span-3 text-center text-gray-400">No hay lugares en esta categoría.</div>';
  } else {
    lugares.forEach(restaurant => {
      const card = createElementWithClass('div', ['bg-white', 'rounded-xl', 'shadow-md', 'overflow-hidden', 'transition', 'duration-300', 'card-hover']);
      let imgHtml = '';
      if ((restaurant.image && restaurant.image.match(/^img\//))) {
        const imgSrc = restaurant.image;
        imgHtml = `<div class=\"img-top-container relative\"><img src=\"${imgSrc}\" alt=\"${restaurant.name}\" class=\"top-card-img-topres\" /></div>`;
      } else {
        let bgColor = restaurant.image && restaurant.image.startsWith('bg-') ? restaurant.image : (cat.color || 'bg-gray-100');
        imgHtml = `<div class=\"img-top-container flex items-center justify-center ${bgColor}\" style=\"height: 12rem;\"><span class=\"text-7xl\">${cat.emoji}</span></div>`;
      }
      let locationHTML = `<svg class=\"w-4 h-4 mr-1 location-icon cursor-pointer\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z\" /><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 11a3 3 0 11-6 0 3 3 0 016 0z\" /></svg>`;
      card.innerHTML = `
        ${imgHtml}
        <div class=\"p-6\">
          <div class=\"flex justify-between items-center mb-2\">
            <h3 class=\"text-xl font-bold\">${restaurant.name}</h3>
            <span class=\"text-sm ${restaurant.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} py-1 px-2 rounded\">${restaurant.isOpen ? 'Abierto' : 'Cerrado'}</span>
          </div>
          <p class=\"text-gray-600 mb-4 descripcion-card\">${restaurant.description}</p>
          <div class=\"flex items-center text-sm text-gray-500\">
            ${locationHTML}<span>${restaurant.location}</span>
          </div>
          <div class=\"footer-categoria\">
            <span class=\"precio-categoria\">$${restaurant.priceRange[0]}-${restaurant.priceRange[1]}</span>
            <button class='menu-btn'>Menú</button>
          </div>
        </div>
      `;
      categoriaListado.appendChild(card);
    });
    // setupLocationIcons(); // Esta función se exportará del nuevo módulo map_modals.js
  }
  lugaresSection.classList.add('hidden');
  categoriaDetalle.classList.remove('hidden');
  categoriaDetalle.scrollIntoView({ behavior: 'smooth' });
}

export function initHomePage() {
    // Mobile menu toggle (adaptado para el header actual)
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
            const isExpanded = mobileMenu.classList.contains('is-open');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Price range slider
    if (priceRange) {
        priceRange.addEventListener('input', () => {
            selectedPrice.textContent = `$${priceRange.value}`;
        });
    }

    // Quick filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const price = button.getAttribute('data-price');
            if (priceRange) priceRange.value = price;
            if (selectedPrice) selectedPrice.textContent = `$${price}`;

            filterButtons.forEach(btn => {
                btn.classList.remove('bg-orange-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            button.classList.remove('bg-gray-200', 'text-gray-700');
            button.classList.add('bg-orange-500', 'text-white');
        });
    });

    // Search functionality
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Smooth scrolling for anchor links (adaptado para el header fijo)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.main-header')?.offsetHeight || 0; // Obtener altura del header
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                // Cerrar menú móvil si está abierto (para el menú de hamburguesa)
                if (mobileMenu && mobileMenu.classList.contains('is-open')) {
                    mobileMenu.classList.remove('is-open');
                    mobileMenuButton.setAttribute('aria-expanded', false);
                }
            }
        });
    });

    // ================= CATEGORÍAS DINÁMICAS =================
    // Click en cada card de categoría
    categoriaCards.forEach((card, idx) => {
        card.addEventListener('click', () => mostrarCategoria(idx));
    });

    // Volver a categorías
    if (volverCategorias) {
        volverCategorias.addEventListener('click', () => {
            categoriaDetalle.classList.add('hidden');
            lugaresSection.classList.remove('hidden');
            lugaresSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Las llamadas a setupLocationIcons() se harán desde main.js después de que los modales de mapa estén disponibles
}