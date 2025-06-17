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
                resolve({ success: true, message: 'Inicio de sesión exitoso.', user: { name: 'Usuario Demo', email: 'user@example.com' } });
            } else {
                reject({ success: false, message: 'Credenciales inválidas.' });
            }
        }, 400);
    });
}
export async function getUserProfile(userId, token) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                name: 'Juan Pérez',
                email: 'user@example.com',
                phone: '300-123-4567',
                address: 'Calle 10 # 15-20, Cúcuta',
                avatar: 'assets/images/user-avatar.jpg'
            });
        }, 300);
    });
}
export async function updateUserProfile(userId, userData, token) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
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
            image: 'assets/images/restaurante1.jpg'
        },
        {
            id: '2',
            name: 'Pizzas al Horno',
            description: 'Auténticas pizzas artesanales hechas en horno de leña.',
            rating: 4.5,
            image: 'assets/images/restaurante2.jpg'
        },
        {
            id: '3',
            name: 'Sushi Delicioso',
            description: 'Variedad de sushi fresco y rollos creativos para los amantes de la comida japonesa.',
            rating: 4.9,
            image: 'assets/images/restaurante3.jpg'
        },
        {
            id: '4',
            name: 'Sabores Colombianos',
            description: 'Platos típicos colombianos con el toque casero de la abuela.',
            rating: 4.3,
            image: 'assets/images/restaurante4.jpg'
        },
        {
            id: '5',
            name: 'La Parrilla Express',
            description: 'Carnes a la brasa al punto perfecto, para una experiencia inigualable.',
            rating: 4.7,
            image: 'assets/images/restaurante5.jpg'
        },
        {
            id: '6',
            name: 'Veggie World',
            description: 'Opciones saludables y deliciosas para vegetarianos y veganos.',
            rating: 4.2,
            image: 'assets/images/restaurante6.jpg'
        }
    ];
    if (isTop) {
        return restaurants.slice(0, 3).map(r => ({ ...r, rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1) }));
    }
    return restaurants;
}
