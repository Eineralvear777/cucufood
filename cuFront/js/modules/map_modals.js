// cuFront/js/modules/map_modals.js

// Estructura de ubicaciones por restaurante (nombre: [array de sucursales])
// Estos datos pueden ser cargados dinámicamente desde una API en un entorno real.
// Se consolida la información de locations de inicio_script.js y topres.html
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
  'El Jardín Secreto': [
    { title: 'Sede Principal', desc: 'Centro Histórico', map: 'https://www.google.com/maps?q=Centro+Histórico,+Cúcuta' }
  ],
  'Fuego & Brasas': [
    { title: 'Sede Principal', desc: 'Zona Financiera', map: 'https://www.google.com/maps?q=Zona+Financiera,+Cúcuta' }
  ],
  'Sakura Fusion': [
    { title: 'Sede Principal', desc: 'Distrito Artístico', map: 'https://www.google.com/maps?q=Distrito+Artístico,+Cúcuta' }
  ],
  'Bistro Parisien': [
    { title: 'Sede Principal', desc: 'Barrio Francés', map: 'https://www.google.com/maps?q=Barrio+Francés,+Cúcuta' }
  ],
  'Mar Azul': [
    { title: 'Sede Principal', desc: 'Paseo Marítimo', map: 'https://www.google.com/maps?q=Paseo+Marítimo,+Cúcuta' }
  ],
  'La Terraza': [
    { title: 'Sede Principal', desc: 'Zona Colonial', map: 'https://www.google.com/maps?q=Zona+Colonial,+Cúcuta' }
  ],
  // ...agrega más restaurantes y sucursales aquí de tus datos existentes
};


// Asegura que el modal solo se cree una vez
function createMapModal() {
    if (!document.getElementById('map-modal')) {
        const mapModal = document.createElement('div');
        mapModal.id = 'map-modal';
        mapModal.className = 'modal'; // Usa la clase .modal para que aplique estilos de login.css
        mapModal.innerHTML = `
            <div class="map-modal-content">
                <div class="map-locations-list" id="map-locations-list"></div>
                <div class="map-iframe-container">
                    <button id="close-map-modal" class="close-button">×</button>
                    <iframe id="map-iframe" src="" width="100%" height="400" style="border:0; border-radius: 0 0 16px 16px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(mapModal);
    }
}


/**
 * Abre el modal del mapa con las ubicaciones de un restaurante.
 * @param {string} restaurantName - El nombre del restaurante cuyas ubicaciones se mostrarán.
 * @param {number} [selectedIdx=0] - El índice de la sucursal a mostrar inicialmente.
 */
export function openMapModal(restaurantName, selectedIdx = 0) {
    createMapModal(); // Aseguramos que el modal exista
    const mapModalEl = document.getElementById('map-modal');
    const locations = restaurantLocations[restaurantName];

    if (!locations || locations.length === 0) {
        // Manejar caso donde no hay ubicaciones definidas para ese restaurante
        console.warn(`No hay ubicaciones definidas para ${restaurantName}.`);
        // Opcional: mostrar un mensaje en el modal
        return;
    }

    const list = document.getElementById('map-locations-list');
    list.innerHTML = ''; // Limpiar lista anterior

    locations.forEach((loc, idx) => {
        const btn = document.createElement('button');
        btn.className = 'map-location-item' + (idx === selectedIdx ? ' selected' : '');
        btn.innerHTML = `<div class='map-location-title'>${loc.title}</div><div class='map-location-desc'>${loc.desc}</div>`;
        btn.onclick = () => openMapModal(restaurantName, idx);
        list.appendChild(btn);
    });

    const iframe = document.getElementById('map-iframe');
    // Asegurarse de que la URL de Google Maps sea válida para incrustar
    // La lógica original usaba un reemplazo que podría no ser necesario o ser incorrecto.
    // Usaremos directamente la URL si ya es un embed, o formatearemos para uno básico.
    const embedUrl = locations[selectedIdx].map.includes('embed') ?
        locations[selectedIdx].map :
        `https://maps.google.com/maps?q=${encodeURIComponent(locations[selectedIdx].map)}&output=embed`;

    iframe.src = embedUrl;
    mapModalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Previene el scroll del body
}


/**
 * Cierra el modal del mapa.
 */
export function closeMapModal() {
    const mapModalEl = document.getElementById('map-modal');
    if (mapModalEl) {
        mapModalEl.style.display = 'none';
        document.getElementById('map-iframe').src = ''; // Limpiar el iframe
        document.body.style.overflow = 'auto'; // Restaurar el scroll del body
    }
}


/**
 * Configura los event listeners para los iconos de ubicación en las tarjetas.
 * Debe llamarse después de que las tarjetas se hayan renderizado en el DOM.
 */
export function setupLocationIcons() {
    document.querySelectorAll('.location-icon').forEach(icon => {
        icon.onclick = function(e) {
            e.stopPropagation(); // Evita que se propague el evento a la tarjeta
            const card = icon.closest('.p-6'); // O el selector de la tarjeta contenedora
            if (!card) return;

            // Intentar obtener el nombre del restaurante de la tarjeta
            const nameElement = card.querySelector('h3');
            const restaurantName = nameElement ? nameElement.textContent.trim() : null;

            if (restaurantName && restaurantLocations[restaurantName]) {
                openMapModal(restaurantName, 0);
            } else {
                // Si el restaurante no está en restaurantLocations,
                // intenta usar la data-map del icono o el texto de ubicación como fallback.
                const mapData = icon.getAttribute('data-map');
                const spanLocation = icon.parentElement.querySelector('span')?.textContent?.trim();

                if (mapData) {
                     // Si data-map tiene un nombre de lugar, podemos intentar una búsqueda genérica
                    openMapModal('__temp_location_search', 0); // Usamos un nombre temporal
                    restaurantLocations['__temp_location_search'] = [{
                        title: 'Ubicación Buscada',
                        desc: mapData,
                        map: `https://maps.google.com/maps?q=${encodeURIComponent(mapData)}&output=embed`
                    }];
                } else if (spanLocation) {
                    openMapModal('__temp_location_search', 0);
                    restaurantLocations['__temp_location_search'] = [{
                        title: 'Ubicación Buscada',
                        desc: spanLocation,
                        map: `https://maps.google.com/maps?q=${encodeURIComponent(spanLocation)}&output=embed`
                    }];
                } else {
                    console.warn('No se pudo determinar la ubicación para el modal del mapa.');
                }
            }
        };
    });
}


// Configuración de listeners global para el modal del mapa (ejecutar solo una vez)
document.addEventListener('DOMContentLoaded', () => {
    createMapModal(); // Asegura que el HTML del modal esté en el DOM al cargar la página
    const mapModalEl = document.getElementById('map-modal');
    if (mapModalEl) {
        mapModalEl.addEventListener('click', (e) => {
            if (e.target.id === 'map-modal' || e.target.id === 'close-map-modal') {
                closeMapModal();
            }
        });
    }
});