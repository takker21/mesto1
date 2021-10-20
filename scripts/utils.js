export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('mousedown', closePopupByOverlayClick);
    document.addEventListener('keydown', closePopupByEscape);
 }
 
 export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('mousedown', closePopupByOverlayClick);
    document.removeEventListener('keydown', closePopupByEscape);
 }
 
 
 const esc = 'Escape';
 
 // Функция закрытия по оверлею 
 const closePopupByOverlayClick = function(evt) {
    const openedPopup = document.querySelector('.popup_opened');
        if(evt.target === openedPopup) {
            closePopup(openedPopup);
        }
    }
 
 // Функция закрытия по кнопке Escape
 const closePopupByEscape = function(evt) {
            if(evt.key === esc) {
            const openedPopup = document.querySelector('.popup_opened');
            closePopup(openedPopup);
        }
 }
 