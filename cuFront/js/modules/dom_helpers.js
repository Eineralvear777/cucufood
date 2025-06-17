// cuFront/js/modules/dom_helpers.js
export function createElementWithClass(tagName, classNames = []) {
    const element = document.createElement(tagName);
    if (classNames.length > 0) {
        element.classList.add(...classNames);
    }
    return element;
}
export function toggleClass(element, className, force) {
    if (element) {
        element.classList.toggle(className, force);
    }
}
export function clearChildren(element) {
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}
export function appendChildren(parent, children) {
    if (parent && children && Array.isArray(children)) {
        children.forEach(child => {
            if (child instanceof HTMLElement) {
                parent.appendChild(child);
            }
        });
    }
}