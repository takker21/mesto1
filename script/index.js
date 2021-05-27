const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupExitButton = popup.querySelector('.popup__exit-button');
const formElement = document.querySelector('.popup__form');
const popupFieldName = popup.querySelector('.popup__field_type_name');
const popupFieldDescription = popup.querySelector('.popup__field_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function popupOpen() {
  popup.classList.add('popup_opened');
  
  popupFieldName.value = profileName.textContent.trim();
  popupFieldDescription.value = profileDescription.textContent.trim();
}

function popupClose() {
  popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupFieldName.value;
  profileDescription.textContent = popupFieldDescription.value;
  popupClose();
}

profileEditButton.addEventListener('click', popupOpen);
popupExitButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);


