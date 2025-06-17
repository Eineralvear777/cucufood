// cuFront/js/modules/api.js
const API_BASE_URL = 'http://localhost:3000/api';

export async function getFeaturedRestaurants() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(_getDummyRestaurants());
        }, 500);
    });
}
export async function getTopRestaurants() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(_getDummyRestaurants(true));
        }, 600);
    });
}
export async function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'user@example.com' && password === 'password123') {
                resolve({ success: true, message: 'Inicio de sesión exitoso.', user: { name: 'Usuario Demo', email: 'user@example.com', avatar: 'assets/images/user-avatar.jpg' }, token: 'mock-jwt-token' });
            } else {
                reject({ success: false, message: 'Credenciales inválidas.' });
            }
        }, 400);
    });
}
export async function getUserProfile(userId, token) {
    return new Promise(resolve => {
        setTimeout(() => {
            // Datos simulados, incluyendo avatar
            resolve({
                name: 'Juan Pérez',
                email: 'user@example.com',
                phone: '300-123-4567',
                address: 'Calle 10 # 15-20, Cúcuta',
                avatar: 'assets/images/user-avatar.jpg' // Añadido para simular la carga de la foto
            });
        }, 300);
    });
}
export async function updateUserProfile(userId, userData, token) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) { // Simula un 90% de éxito
                resolve({ success: true, message: 'Perfil actualizado exitosamente.', user: userData });
            } else {
                reject({ success: false, message: 'Fallo al actualizar el perfil. Intente de nuevo.' });
            }
        }, 500);
    });
}
function _getDummyRestaurants(isTop = false) {
    const restaurants = [
        {
            id: '1',
            name: 'El Famoso Pollo',
            description: 'El mejor pollo asado de la ciudad. Tradición y sabor en cada bocado.',
            rating: 4.8,
            image: 'assets/images/restaurante1.jpg',
            priceTag: '$$', // Añadido para la consistencia
            location: 'Centro, a 1.0 km', // Añadido para la consistencia
            isOpen: true, // Añadido para la consistencia
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sEl%20Famoso%20Pollo!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
        },
        {
            id: '2',
            name: 'Pizzas al Horno',
            description: 'Auténticas pizzas artesanales hechas en horno de leña.',
            rating: 4.5,
            image: 'assets/images/restaurante2.jpg',
            priceTag: '$$$',
            location: 'Norte, a 2.5 km',
            isOpen: true,
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sPizzas%20al%20Horno!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
        },
        {
            id: '3',
            name: 'Sushi Delicioso',
            description: 'Variedad de sushi fresco y rollos creativos para los amantes de la comida japonesa.',
            rating: 4.9,
            image: 'assets/images/restaurante3.jpg',
            priceTag: '$$$$',
            location: 'Este, a 1.8 km',
            isOpen: true,
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sSushi%20Delicioso!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
        },
        {
            id: '4',
            name: 'Sabores Colombianos',
            description: 'Platos típicos colombianos con el toque casero de la abuela.',
            rating: 4.3,
            image: 'assets/images/restaurante4.jpg',
            priceTag: '$',
            location: 'Sur, a 3.2 km',
            isOpen: false,
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sSabores%20Colombianos!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
        },
        {
            id: '5',
            name: 'La Parrilla Express',
            description: 'Carnes a la brasa al punto perfecto, para una experiencia inigualable.',
            rating: 4.7,
            image: 'assets/images/restaurante5.jpg',
            priceTag: '$$$',
            location: 'Oeste, a 0.5 km',
            isOpen: true,
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sLa%20Parrilla%20Express!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
        },
        {
            id: '6',
            name: 'Veggie World',
            description: 'Opciones saludables y deliciosas para vegetarianos y veganos.',
            rating: 4.2,
            image: 'assets/images/restaurante6.jpg',
            priceTag: '$',
            location: 'Centro Comercial, a 2.0 km',
            isOpen: true,
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sVeggie%20World!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
        }
    ];
    if (isTop) {
        // En tu topres.html, los nombres son específicos, por lo que usaremos esos para los top restaurants
        // para asegurarnos que los datos de prueba coincidan con las imágenes hardcodeadas si se usan.
        return [
            {
                id: '1',
                name: 'El Jardín Secreto', // Nombre del hardcodeado en topres.html
                description: 'Cocina de autor en un ambiente mágico.',
                rating: 5.0,
                image: 'img/goat.jpg',
                priceTag: '$$$',
                location: 'Centro Histórico',
                isOpen: true,
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sEl%20Jardin%20Secreto!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
            },
            {
                id: '2',
                name: 'Fuego & Brasas',
                description: 'Las mejores carnes a la parrilla y ambiente rústico.',
                rating: 4.9,
                image: 'img/mbp.jpg',
                priceTag: '$$$$',
                location: 'Zona Financiera',
                isOpen: true,
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sFuego%20%26%20Brasas!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
            },
            {
                id: '3',
                name: 'Sakura Fusion',
                description: 'Experiencia asiática moderna con sabores innovadores.',
                rating: 4.8,
                image: 'img/spezia.jpg',
                priceTag: '$$$',
                location: 'Distrito Artístico',
                isOpen: true,
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sSakura%20Fusion!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
            },
            {
                id: '4',
                name: 'Bistro Parisien',
                description: 'Clásicos franceses en un ambiente acogedor.',
                rating: 4.7,
                image: 'img/goat.jpg',
                priceTag: '$$$',
                location: 'Barrio Francés',
                isOpen: true,
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sBistro%20Parisien!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
            },
            {
                id: '5',
                name: 'Mar Azul',
                description: 'Delicias del mar con ingredientes frescos.',
                rating: 4.9,
                image: 'img/mbp.jpg',
                priceTag: '$$$$',
                location: 'Paseo Marítimo',
                isOpen: true,
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sMar%20Azul!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
            },
            {
                id: '6',
                name: 'La Terraza',
                description: 'Comida internacional con vistas panorámicas.',
                rating: 4.8,
                image: 'img/spezia.jpg',
                priceTag: '$$$',
                location: 'Zona Colonial',
                isOpen: true,
                mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.575510609388!2d-75.7672922!3d7.886001199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66440f0a59b6d9%3A0x67a3a9b7f5e1f0e!2sLa%20Terraza!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco'
            }
        ];
    }
    return restaurants;
}