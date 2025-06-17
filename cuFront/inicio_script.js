// inicio_script.js
// ...existing code from <script> tag in inicio.html...

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Price range slider
const priceRange = document.getElementById('price-range');
const selectedPrice = document.getElementById('selected-price');

priceRange.addEventListener('input', () => {
    selectedPrice.textContent = `$${priceRange.value}`;
});

// Quick filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const price = button.getAttribute('data-price');
        priceRange.value = price;
        selectedPrice.textContent = `$${price}`;
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('bg-orange-500', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });
        // Add active class to clicked button
        button.classList.remove('bg-gray-200', 'text-gray-700');
        button.classList.add('bg-orange-500', 'text-white');
    });
});

// Search functionality
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const resultsContainer = document.getElementById('results-container');
const resultsSummary = document.getElementById('results-summary');
const noResults = document.getElementById('no-results');

// Sample restaurant data with price ranges
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
        image: "img/goat.jpg",
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
        image: "img/goat.jpg",
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
        img: "img/goat.jpg",
        location: "Plaza Central, a 0.5 km",
        description: "Pizzas artesanales con masa fresca todos los días",
        isOpen: true
    },
    {
        name: "Pizza Fantástica 1",
        type: "Pizzería",
        rating: 4.6,
        priceTag: "$$",
        priceRange: [85, 130],
        img: "img/mbp.jpg",
        location: "Barrio 1, a 0.7 km",
        description: "Pizzería artesanal con ingredientes frescos y variedad de sabores. Sucursal #1",
        isOpen: true
    },
    {
        name: "Pizza Fantástica 2",
        type: "Pizzería",
        rating: 4.7,
        priceTag: "$$$",
        priceRange: [90, 140],
        img: "img/spezia.jpg",
        location: "Barrio 2, a 0.9 km",
        description: "Pizzería artesanal con ingredientes frescos y variedad de sabores. Sucursal #2",
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

// AGREGA MUCHOS RESTAURANTES A LA CATEGORÍA PIZZERÍAS
for (let i = 1; i <= 15; i++) {
  restaurants.push({
    name: `Pizza Fantástica ${i}`,
    type: "Pizzería",
    rating: (4 + Math.random()).toFixed(1),
    priceTag: i % 3 === 0 ? "$$$" : i % 2 === 0 ? "$$" : "$",
    priceRange: [80 + i * 5, 120 + i * 10],
    image: "bg-red-100",
    location: `Barrio ${i}, a ${(0.5 + i * 0.2).toFixed(1)} km`,
    description: `Pizzería artesanal con ingredientes frescos y variedad de sabores. Sucursal #${i}`,
    isOpen: i % 4 !== 0
  });
}

// Search function
function performSearch() {
    const budget = parseInt(priceRange.value);
    const query = searchInput.value.toLowerCase();
    // Filter restaurants by budget and search query
    const filteredResults = restaurants.filter(restaurant => {
        const matchesBudget = restaurant.priceRange[0] <= budget;
        const matchesQuery = query === '' || 
            restaurant.name.toLowerCase().includes(query) || 
            restaurant.type.toLowerCase().includes(query) || 
            restaurant.description.toLowerCase().includes(query);
        return matchesBudget && matchesQuery;
    });
    // Sort by price (lowest to highest)
    filteredResults.sort((a, b) => a.priceRange[0] - b.priceRange[0]);
    // Display results
    displayResults(filteredResults, budget);
}

// Display search results
function displayResults(results, budget) {
    // Clear previous results
    resultsContainer.innerHTML = '';
    // Update results summary
    resultsSummary.textContent = `Mostrando opciones con presupuesto de hasta $${budget}`;
    // Show/hide no results message
    if (results.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        // Create restaurant cards
        results.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow-md overflow-hidden transition duration-300 card-hover';
            // Imagen/logo superior: igual que en el detalle de categoría
            let imgHtml = '';
            if ((restaurant.img && restaurant.img.match(/^img\//)) || (restaurant.image && restaurant.image.match(/^img\//))) {
                const imgSrc = restaurant.img && restaurant.img.match(/^img\//) ? restaurant.img : restaurant.image;
                imgHtml = `<div class=\"img-top-container relative\"><img src=\"${imgSrc}\" alt=\"${restaurant.name}\" class=\"top-card-img-topres\" /></div>`;
            } else {
                // fallback: color de fondo y emoji según tipo
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
        setupLocationIcons();
    }
    // Show results section
    searchResults.classList.remove('hidden');
    // Scroll to results
    searchResults.scrollIntoView({ behavior: 'smooth' });
}

// Helper function to get emoji based on restaurant type
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

// Event listeners
searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// ================= CATEGORÍAS DINÁMICAS =================

// Datos de categorías (puedes ampliar o mejorar)
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
    tipo: 'Bar', // Cambia a 'Bar' para futuro
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

// Selección de elementos
const categoriaCards = document.querySelectorAll('#lugares .card-hover');
const lugaresSection = document.getElementById('lugares');
const categoriaDetalle = document.getElementById('categoria-detalle');
const volverCategorias = document.getElementById('volver-categorias');
const categoriaEmoji = document.getElementById('categoria-emoji');
const categoriaNombre = document.getElementById('categoria-nombre');
const categoriaDescripcion = document.getElementById('categoria-descripcion');
const categoriaLugares = document.getElementById('categoria-lugares');
const categoriaListado = document.getElementById('categoria-listado');

// Filtra por tipo para cada categoría
function mostrarCategoria(idx) {
  const cat = categorias[idx];
  categoriaEmoji.textContent = cat.emoji;
  categoriaNombre.textContent = cat.nombre;
  categoriaDescripcion.textContent = cat.descripcion;
  categoriaLugares.textContent = `${cat.lugares} lugares · Desde $${cat.minPrecio}`;

  // Filtrar restaurantes por tipo
  const lugares = restaurants.filter(r => {
    // Coincidencia flexible por tipo
    return r.type && r.type.toLowerCase().includes(cat.tipo.toLowerCase());
  });

  // Renderizar cards
  categoriaListado.innerHTML = '';
  if (lugares.length === 0) {
    categoriaListado.innerHTML = '<div class="col-span-3 text-center text-gray-400">No hay lugares en esta categoría.</div>';
  } else {
    lugares.forEach(restaurant => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl shadow-md overflow-hidden transition duration-300 card-hover';
      // Imagen/logo superior: muestra la imagen de la empresa si existe, si no el emoji
      let imgHtml = '';
      // Si hay imagen tipo img/xxx.jpg, úsala
      if ((restaurant.img && restaurant.img.match(/^img\//)) || (restaurant.image && restaurant.image.match(/^img\//))) {
        const imgSrc = restaurant.img && restaurant.img.match(/^img\//) ? restaurant.img : restaurant.image;
        imgHtml = `<div class=\"img-top-container relative\"><img src=\"${imgSrc}\" alt=\"${restaurant.name}\" class=\"top-card-img-topres\" /></div>`;
      } else {
        // fallback: color de fondo y emoji de la categoría
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
    // Reaplicar funcionalidad a los nuevos íconos
    setupLocationIcons();
  }

  // Mostrar sección detalle, ocultar categorías
  lugaresSection.classList.add('hidden');
  categoriaDetalle.classList.remove('hidden');
  categoriaDetalle.scrollIntoView({ behavior: 'smooth' });
}

// Click en cada card de categoría
categoriaCards.forEach((card, idx) => {
  card.addEventListener('click', () => mostrarCategoria(idx));
});

// Volver a categorías
volverCategorias.addEventListener('click', () => {
  categoriaDetalle.classList.add('hidden');
  lugaresSection.classList.remove('hidden');
  lugaresSection.scrollIntoView({ behavior: 'smooth' });
});

// ========== MAPA SUCURSALES MODAL ========== //
// Estructura de ubicaciones por restaurante (nombre: [array de sucursales])
const restaurantLocations = {
  'La Trattoria': [
    {
      title: 'Sede Principal',
      desc: 'Centro, a 1.2 km',
      map: 'https://www.google.com/maps?q=Centro,+Cúcuta'
    }
  ],
  'Sushi Master': [
    {
      title: 'Sede Principal',
      desc: 'Zona Norte, a 2.5 km',
      map: 'https://www.google.com/maps?q=Zona+Norte,+Cúcuta'
    },
    {
      title: 'Sede Express',
      desc: 'Centro Comercial, a 2.0 km',
      map: 'https://www.google.com/maps?q=Centro+Comercial,+Cúcuta'
    }
  ],
  'Green Life': [
    {
      title: 'Sede Principal',
      desc: 'Parque Central, a 0.8 km',
      map: 'https://www.google.com/maps?q=Parque+Central,+Cúcuta'
    },
    {
      title: 'Sucursal Norte',
      desc: 'Avenida Norte, a 3.2 km',
      map: 'https://www.google.com/maps?q=Avenida+Norte,+Cúcuta'
    }
  ],
  'Platano Verde': [
    {
      title: 'Sede Principal',
      desc: 'Av. 0 #0-00, Cúcuta',
      map: 'https://www.google.com/maps?q=Av.+0+%230-00,+Cúcuta'
    },
    {
      title: 'Sucursal Centro',
      desc: 'Calle 10 #10-10, Cúcuta',
      map: 'https://www.google.com/maps?q=Calle+10+%2310-10,+Cúcuta'
    }
  ]
  // ...agrega más restaurantes y sucursales aquí...
};

// Modal HTML para sucursales
if (!document.getElementById('map-modal')) {
  const mapModal = document.createElement('div');
  mapModal.id = 'map-modal';
  mapModal.innerHTML = `
    <div class="map-modal-content">
      <div class="map-locations-list" id="map-locations-list"></div>
      <div class="map-iframe-container">
        <button id="close-map-modal">&times;</button>
        <iframe id="map-iframe" src="" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(mapModal);
}

function openMapModal(restaurantName, selectedIdx = 0) {
  const locations = restaurantLocations[restaurantName];
  if (!locations) return;
  const list = document.getElementById('map-locations-list');
  list.innerHTML = '';
  locations.forEach((loc, idx) => {
    const btn = document.createElement('button');
    btn.className = 'map-location-item' + (idx === selectedIdx ? ' selected' : '');
    btn.innerHTML = `<div class='map-location-title'>${loc.title}</div><div class='map-location-desc'>${loc.desc}</div>`;
    btn.onclick = () => openMapModal(restaurantName, idx);
    list.appendChild(btn);
  });
  // Set map
  const iframe = document.getElementById('map-iframe');
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(locations[selectedIdx].map.replace('https://www.google.com/maps?q=', ''))}&output=embed`;
  iframe.src = embedUrl;
  document.getElementById('map-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Evento para cerrar el modal
const mapModalEl = document.getElementById('map-modal');
mapModalEl.addEventListener('click', function(e) {
  if (e.target.id === 'map-modal' || e.target.id === 'close-map-modal') {
    mapModalEl.style.display = 'none';
    document.getElementById('map-iframe').src = '';
    document.body.style.overflow = 'auto';
  }
});

// Delegación de evento para íconos de ubicación en cards
function setupLocationIcons() {
  document.querySelectorAll('.location-icon').forEach(icon => {
    icon.onclick = function(e) {
      e.stopPropagation();
      const card = icon.closest('.p-6');
      if (!card) return;
      const name = card.querySelector('h3')?.textContent?.trim();
      if (name && restaurantLocations[name]) {
        openMapModal(name, 0);
      } else {
        // Si no hay sucursales definidas, mostrar solo la ubicación del span
        const span = icon.parentElement.querySelector('span');
        if (span) {
          const loc = span.textContent;
          restaurantLocations['__temp'] = [{ title: 'Ubicación', desc: loc, map: `https://www.google.com/maps?q=${encodeURIComponent(loc)}` }];
          openMapModal('__temp', 0);
        }
      }
    };
  });
}
// Ejecutar al cargar
setupLocationIcons();
