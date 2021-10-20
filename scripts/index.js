import { openPopup, closePopup } from './utils.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('#edit-profile-close');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__subtitle');
const popupFormProfile = document.querySelector('#form-profile');
const openAddCardButton = document.querySelector('.profile__add-button');
const inputAddCardName = document.querySelector('.form__input_type_place');
const inputAddCardLink = document.querySelector('.form__input_type_link');
const closePopupAddButton = document.querySelector('.popup__button-close');
const cardsContainer = document.querySelector('.elements');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.form');
const inputList = formAddCard.querySelectorAll('.form__input');
const closeImgButton = document.querySelector('#closeImg');
const popupFigure = document.querySelector('.popup_type_image');


// Добавления карточек при загрузке страницы
 initialCards.forEach (function (item){
   renderCard(item.link, item.name);
})

function renderCard(link, name) {
   const cardTemplate = new Card('#template-card', name, link);

   cardsContainer.prepend(cardTemplate.createCard());
}

// Добавления карточек через инпут попапа
function handleCardFormSubmit(evt) {
   evt.preventDefault();
   renderCard(inputAddCardLink.value, inputAddCardName.value);
   closePopup(popupAddCard);
}

// Открытие окна редактирования профиля
function openEditPopup() {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

// Изменение данных профиля 
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function closeAddCardPopup() {
   closePopup(popupAddCard);
}

// Cлушатель отправки формы редактирования профиля
popupFormProfile.addEventListener('submit', handleProfileFormSubmit); 

// Cлушатель кнопки открытия попапа редактирования профиля
openPopupButton.addEventListener('click', openEditPopup);

// Кнопка закрытия попапа редактирования профиля
closePopupButton.addEventListener('click', () => {
   closePopup(popupEditProfile);
});

// Слушатель кнопки открытия попапа для добавления карточки
openAddCardButton.addEventListener('click', () => {
   openPopup(popupAddCard);
   addCardFormValidator.resetForm();
});

// Слушатель кнопки закрытия попапа добавления карточки
closePopupAddButton.addEventListener('click', closeAddCardPopup);

closeImgButton.addEventListener('click', () => {
   closePopup(popupFigure);
})

// Cлушатель отправки формы добавления карточки из попапа
popupAddCard.addEventListener('submit', handleCardFormSubmit);

// Cлушатель отправки формы редактирования профиля
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);


const config = {
   formSelector: '.form',
   inputSelector: '.form__input',
   submitButtonSelector: '.form__button',
   inputErrorClass: 'form__input_type_error',
   errorClass: 'form__input-error_is-active'    
}

const formValidatorEditProfile = new FormValidator(config, popupEditProfile);
const addCardFormValidator = new FormValidator (config, formAddCard);

formValidatorEditProfile.enableValidation();
addCardFormValidator.enableValidation();