// cuFront/js/pages/profile.js
import { getUserProfile, updateUserProfile } from '../modules/api.js';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem, showMessage } from '../modules/utils.js';
import { updateAuthUI } from '../modules/auth_ui.js'; // Importamos la función para actualizar la UI global de autenticación

let isEditing = false;
let currentUserData = {};

const profileNameDisplay = document.getElementById('profile-name-display');
const profilePhoneDisplay = document.getElementById('profile-phone-display');
const profileAddressDisplay = document.getElementById('profile-address-display');
const profileNameInput = document.getElementById('profile-name-input');
const profilePhoneInput = document.getElementById('profile-phone-input');
const profileAddressInput = document.getElementById('profile-address-input');
const editProfileBtn = document.getElementById('edit-profile-btn');
const saveProfileBtn = document.getElementById('save-profile-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const logoutBtn = document.getElementById('logout-btn');
const profileMessageArea = document.getElementById('profile-message');
const profileAvatar = document.querySelector('.profile-avatar'); // Esto es para la imagen principal del perfil en la página de perfil
const inputFoto = document.getElementById('input-foto'); // Para la carga de la foto de perfil


function fillProfileData(userData) {
    if (profileNameDisplay) profileNameDisplay.textContent = userData.name || 'N/A';
    if (profilePhoneDisplay) profilePhoneDisplay.textContent = userData.phone || 'N/A';
    if (profileAddressDisplay) profileAddressDisplay.textContent = userData.address || 'N/A';
    if (profileNameInput) profileNameInput.value = userData.name || '';
    if (profilePhoneInput) profilePhoneInput.value = userData.phone || '';
    if (profileAddressInput) profileAddressInput.value = userData.address || '';

    // Cargar foto de perfil y mostrar/ocultar icono (lógica de perfil.html, adaptada)
    if (profileAvatar) {
        if (userData.avatar) {
            profileAvatar.src = userData.avatar;
            profileAvatar.classList.remove('hidden'); // Asegurarse de que sea visible
            // Si hay un icono asociado (como en el html original), ocultarlo
            const profileIcon = profileAvatar.nextElementSibling; // Asume que el SVG está justo después
            if (profileIcon && profileIcon.tagName === 'svg') {
                profileIcon.classList.add('hidden');
            }
        } else {
            profileAvatar.classList.add('hidden'); // Ocultar imagen si no hay avatar
            const profileIcon = profileAvatar.nextElementSibling;
            if (profileIcon && profileIcon.tagName === 'svg') {
                profileIcon.classList.remove('hidden'); // Mostrar icono
            }
        }
    }
}

function toggleEditMode(editing) {
    isEditing = editing;
    const displayElements = [profileNameDisplay, profilePhoneDisplay, profileAddressDisplay];
    const inputElements = [profileNameInput, profilePhoneInput, profileAddressInput];
    displayElements.forEach(el => { if (el) el.style.display = editing ? 'none' : 'inline'; });
    inputElements.forEach(el => { if (el) el.style.display = editing ? 'inline' : 'none'; });
    if (editProfileBtn) editProfileBtn.style.display = editing ? 'none' : 'inline-block';
    if (saveProfileBtn) saveProfileBtn.style.display = editing ? 'inline-block' : 'none';
    if (cancelEditBtn) cancelEditBtn.style.display = editing ? 'inline-block' : 'none';
}

async function loadUserProfile() {
    const user = getLocalStorageItem('currentUser');
    const token = getLocalStorageItem('userToken');
    if (!user || !token) {
        showMessage(profileMessageArea, 'No hay sesión iniciada. Por favor, inicia sesión.', 'error');
        // Redirigir a login, si el flujo es que profile.html no debe verse sin sesión
        setTimeout(() => window.location.href = 'index.html', 2000); // Redirige a index.html que tiene el modal
        return;
    }
    showMessage(profileMessageArea, 'Cargando datos del perfil...', 'info', 0);
    try {
        const profileData = await getUserProfile(user.id || 'dummyId', token); // id se asume, puede que necesites el ID real del usuario
        // Unificar datos, priorizando los del API si son más completos
        currentUserData = { ...user, ...profileData };
        fillProfileData(currentUserData);
        showMessage(profileMessageArea, 'Perfil cargado exitosamente.', 'success');
    } catch (error) {
        showMessage(profileMessageArea, `Error al cargar el perfil: ${error.message}`, 'error');
    }
}

async function saveProfileChanges() {
    const user = getLocalStorageItem('currentUser');
    const token = getLocalStorageItem('userToken');
    if (!user || !token) {
        showMessage(profileMessageArea, 'No hay sesión iniciada.', 'error');
        return;
    }
    const updatedData = {
        name: profileNameInput.value.trim(),
        phone: profilePhoneInput.value.trim(),
        address: profileAddressInput.value.trim()
    };
    showMessage(profileMessageArea, 'Guardando cambios...', 'info', 0);
    try {
        const response = await updateUserProfile(user.id || 'dummyId', updatedData, token);
        if (response.success) {
            // Actualizar currentUser en localStorage y la UI global
            setLocalStorageItem('currentUser', { ...user, ...response.user });
            currentUserData = { ...currentUserData, ...response.user }; // Actualizar datos locales
            fillProfileData(currentUserData);
            toggleEditMode(false);
            showMessage(profileMessageArea, response.message, 'success');
            updateAuthUI(); // Llama a la función global para actualizar header/footer
        } else {
            showMessage(profileMessageArea, response.message || 'Fallo al guardar los cambios.', 'error');
        }
    } catch (error) {
        showMessage(profileMessageArea, `Error al guardar: ${error.message}`, 'error');
    }
}

function handleLogoutProfilePage() { // Renombrado para evitar conflicto con handleLogout global en auth_ui.js
    removeLocalStorageItem('userToken');
    removeLocalStorageItem('currentUser');
    showMessage(profileMessageArea, 'Sesión cerrada exitosamente.', 'success');
    updateAuthUI(); // Asegura que el header/footer se actualice
    setTimeout(() => {
        window.location.href = 'index.html'; // Redirige al inicio
    }, 1000);
}


export function initProfilePage() {
    loadUserProfile();

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => toggleEditMode(true));
    }
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', saveProfileChanges);
    }
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', () => {
            fillProfileData(currentUserData); // Restaurar datos originales
            toggleEditMode(false);
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogoutProfilePage); // Usa la función renombrada
    }

    // Manejar carga de foto de perfil (movido desde el script inline de perfil.html)
    if (inputFoto) {
        inputFoto.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    // Guarda la imagen como base64 en los datos del usuario
                    currentUserData.avatar = evt.target.result;
                    setLocalStorageItem('currentUser', currentUserData); // Actualiza el localStorage
                    fillProfileData(currentUserData); // Muestra la nueva foto
                    showMessage(profileMessageArea, 'Foto de perfil actualizada.', 'success');
                    updateAuthUI(); // Llama a la función global para actualizar header/footer
                };
                reader.readAsDataURL(file);
            }
        });
    }
}