"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionProvider = optionProvider;
const core_js_1 = require("./core.js");
const dropdownCleanups = new WeakMap();
function removeDropdown(inputElement) {
    const cleanup = dropdownCleanups.get(inputElement);
    if (cleanup) {
        cleanup();
        dropdownCleanups.delete(inputElement);
    }
}
function optionProvider(event, inputId, customStyles = {} // 기본값을 빈 객체로 설정
) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) {
        return;
    }
    const value = inputElement.value;
    removeDropdown(inputElement);
    if (!value.trim()) {
        return;
    }
    const convertedToEnglish = (0, core_js_1.convertKoreanToEnglish)(value);
    const convertedToKorean = (0, core_js_1.convertEnglishToKorean)(value);
    const recommendations = Array.from(new Set());
    if (value !== convertedToEnglish) {
        recommendations.push(convertedToEnglish);
    }
    if (value !== convertedToKorean) {
        recommendations.push(convertedToKorean);
    }
    if (recommendations.length === 0) {
        return;
    }
    const dropdown = document.createElement('ul');
    dropdown.id = `recommendation-dropdown-${inputId}`;
    dropdown.setAttribute('role', 'listbox');
    dropdown.setAttribute('aria-label', 'Typing change recommendations');
    const inputRect = inputElement.getBoundingClientRect();
    const activeColor = customStyles.activeItemBackgroundColor || '#dbeafe';
    const hoverColor = customStyles.itemHoverBackgroundColor || '#eef6ff';
    const itemPadding = customStyles.itemPadding || '10px 12px';
    const itemColor = customStyles.itemColor || customStyles.color || '#162033';
    const { activeItemBackgroundColor, itemHoverBackgroundColor, itemPadding: _itemPadding, itemColor: _itemColor, ...styleOverrides } = customStyles;
    const defaultStyles = {
        position: 'absolute',
        top: `${window.scrollY + inputRect.bottom + 8}px`,
        left: `${window.scrollX + inputRect.left}px`,
        backgroundColor: '#fff',
        border: '1px solid rgba(15, 23, 42, 0.12)',
        borderRadius: '8px',
        boxShadow: '0 18px 45px rgba(15, 23, 42, 0.16)',
        listStyle: 'none',
        padding: '6px',
        margin: '0',
        width: `${inputRect.width}px`,
        zIndex: '1000',
        color: itemColor,
        fontFamily: 'inherit',
        fontSize: '14px',
    };
    Object.assign(dropdown.style, { ...defaultStyles, ...styleOverrides });
    let currentIndex = -1;
    const selectItem = (recommendation) => {
        inputElement.value = recommendation;
        inputElement.dispatchEvent(new Event('change', { bubbles: true }));
        removeDropdown(inputElement);
        inputElement.focus();
    };
    const setActiveItem = (nextIndex) => {
        const items = Array.from(dropdown.querySelectorAll('li'));
        if (items.length === 0) {
            return;
        }
        currentIndex = (nextIndex + items.length) % items.length;
        items.forEach((item, index) => {
            const isActive = index === currentIndex;
            item.style.backgroundColor = isActive ? activeColor : '';
            item.setAttribute('aria-selected', String(isActive));
        });
    };
    recommendations.forEach((recommendation, index) => {
        const listItem = document.createElement('li');
        listItem.id = `${dropdown.id}-item-${index}`;
        listItem.setAttribute('role', 'option');
        listItem.setAttribute('aria-selected', 'false');
        listItem.textContent = recommendation;
        listItem.style.padding = itemPadding;
        listItem.style.borderRadius = '6px';
        listItem.style.cursor = 'pointer';
        listItem.style.overflow = 'hidden';
        listItem.style.textOverflow = 'ellipsis';
        listItem.style.whiteSpace = 'nowrap';
        listItem.addEventListener('mouseenter', () => setActiveItem(index));
        listItem.addEventListener('mousedown', (mouseEvent) => {
            mouseEvent.preventDefault();
            selectItem(recommendation);
        });
        listItem.addEventListener('mouseover', () => {
            if (index !== currentIndex) {
                listItem.style.backgroundColor = hoverColor;
            }
        });
        listItem.addEventListener('mouseout', () => {
            if (index !== currentIndex) {
                listItem.style.backgroundColor = '';
            }
        });
        dropdown.appendChild(listItem);
    });
    document.body.appendChild(dropdown);
    const onKeydown = (keyboardEvent) => {
        const items = Array.from(dropdown.querySelectorAll('li'));
        if (items.length === 0) {
            return;
        }
        if (keyboardEvent.key === 'Tab' || keyboardEvent.key === 'ArrowDown') {
            keyboardEvent.preventDefault();
            setActiveItem(currentIndex + 1);
            return;
        }
        if (keyboardEvent.key === 'ArrowUp') {
            keyboardEvent.preventDefault();
            setActiveItem(currentIndex - 1);
            return;
        }
        if (keyboardEvent.key === 'Enter' && currentIndex >= 0) {
            keyboardEvent.preventDefault();
            selectItem(items[currentIndex].textContent || '');
            return;
        }
        if (keyboardEvent.key === 'Escape') {
            removeDropdown(inputElement);
        }
    };
    const onDocumentPointerDown = (pointerEvent) => {
        if (pointerEvent.target instanceof Node && !dropdown.contains(pointerEvent.target) && pointerEvent.target !== inputElement) {
            removeDropdown(inputElement);
        }
    };
    const onWindowChange = () => removeDropdown(inputElement);
    const cleanup = () => {
        dropdown.remove();
        inputElement.removeEventListener('keydown', onKeydown);
        document.removeEventListener('mousedown', onDocumentPointerDown);
        window.removeEventListener('resize', onWindowChange);
        window.removeEventListener('scroll', onWindowChange, true);
        inputElement.removeAttribute('aria-controls');
    };
    inputElement.setAttribute('aria-controls', dropdown.id);
    inputElement.addEventListener('keydown', onKeydown);
    document.addEventListener('mousedown', onDocumentPointerDown);
    window.addEventListener('resize', onWindowChange);
    window.addEventListener('scroll', onWindowChange, true);
    dropdownCleanups.set(inputElement, cleanup);
    if (event.type === 'focus') {
        setActiveItem(0);
    }
}
