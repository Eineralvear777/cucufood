export function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export function isValidPassword(password, minLength = 6) {
    return password.length >= minLength;
}
export function setLocalStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(`Error saving to localStorage: ${e}`);
    }
}
export function getLocalStorageItem(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error(`Error reading from localStorage: ${e}`);
        return null;
    }
}
export function removeLocalStorageItem(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error(`Error removing from localStorage: ${e}`);
    }
}
export function showMessage(element, message, type, duration = 3000) {
    if (!element) return;
    element.textContent = message;
    element.className = `message-area message-area--${type}`;
    element.style.display = 'block';
    if (duration > 0) {
        setTimeout(() => {
            element.style.display = 'none';
            element.textContent = '';
            element.className = 'message-area';
        }, duration);
    }
}
export function setupGlobalListeners() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            const isExpanded = mainNav.classList.contains('is-open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    document.addEventListener('click', (event) => {
        if (mainNav && menuToggle && mainNav.classList.contains('is-open') &&
            !mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
            mainNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });
}
