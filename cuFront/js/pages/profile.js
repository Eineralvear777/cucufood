import { getUserProfile, updateUserProfile } from '../modules/api.js';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem, showMessage } from '../modules/utils.js';

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
const profileAvatar = document.querySelector('.profile-avatar');

function fillProfileData(userData) {
    if (profileNameDisplay) profileNameDisplay.textContent = userData.name || 'N/A';
    if (profilePhoneDisplay) profilePhoneDisplay.textContent = userData.phone || 'N/A';
    if (profileAddressDisplay) profileAddressDisplay.textContent = userData.address || 'N/A';
    if (profileAvatar && userData.avatar) profileAvatar.src = userData.avatar;
    if (profileNameInput) profileNameInput.value = userData.name || '';
    if (profilePhoneInput) profilePhoneInput.value = userData.phone || '';
    if (profileAddressInput) profileAddressInput.value = userData.address || '';
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
        setTimeout(() => window.location.href = 'login.html', 2000);
        return;
    }
    showMessage(profileMessageArea, 'Cargando datos del perfil...', 'info', 0);
    try {
        const profileData = await getUserProfile(user.id || 'dummyId', token);
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
            currentUserData = { ...currentUserData, ...response.user };
            fillProfileData(currentUserData);
            toggleEditMode(false);
            showMessage(profileMessageArea, response.message, 'success');
        } else {
            showMessage(profileMessageArea, response.message || 'Fallo al guardar los cambios.', 'error');
        }
    } catch (error) {
        showMessage(profileMessageArea, `Error al guardar: ${error.message}`, 'error');
    }
}
function handleLogout() {
    removeLocalStorageItem('userToken');
    removeLocalStorageItem('currentUser');
    showMessage(profileMessageArea, 'Sesión cerrada exitosamente.', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
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
            fillProfileData(currentUserData);
            toggleEditMode(false);
        });
    }
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}
