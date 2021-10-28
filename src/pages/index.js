import './index.css';

import {
  validationObject,
  selectorObj,
  editButton,
  addPhotoButton,
  popupProfileInputs,
  changeAvatarButton
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/popup-with-image.js";
import PopupWithForm from "../components/popup-with-form.js";
import UserInfo from "../components/user-info.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";


// --- ФУНКЦИИ ---
//функция открытия попапа с картинкой (при клике на карточку)
function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

//функция открытия попапа с подтверждением (при клике на корзину)
function handleTrashClick(id, card) {
  popupWithConfirm.setSubmitAction(() => handlePopupConfirm(id, card))
  popupWithConfirm.open();
}

// функция удаления карточек от пользователя (подтверждение)
function handlePopupConfirm(id, card) {
  api.deleteCard(id)
    .then(() => {
      card.removeCard();
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

// функция отвечающая за постановку лайка
function handleLikeClick(id, isLiked, card) {
  if (isLiked) {
    //отправляем запрос снятия лайка
    api.dislikedCard(id)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    //отправляем запрос на установку лайка
    api.likedCard(id)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// функция редактирования профиля (сабмит формы)
function handlePopupProfile(inputsData) {
  popupFormProfile.renderSaving(true);

  api.saveUserChanges(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormProfile.renderSaving(false);
    })
}

// функция заполнения полей формы данными из профиля
function handleTextInput() {
  const userData = userInfo.getUserInfo();
  popupProfileInputs.forEach(input => {
    input.value = userData[input.name];
  });
}

// функция создания карточек
function createCard(dataCard, id) {
  const card = new Card({
      data: dataCard,
      handleCardClick,
      handleTrashClick,
      handleLikeClick,
    },
    selectorObj.cardId,
    id);

  const newCard = card.generateCard();

  return newCard;
}

// функция добавления новых карточек от пользователя (сабмит формы)
function handlePopupAddCard(inputsData) {
  popupFormAddCard.renderSaving(true);

  api.postNewCard(inputsData)
    .then((data) => {
      cardList.addItemPrepend(createCard(data, data.owner._id));
      popupFormAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormAddCard.renderSaving(false);
    })
}

// функция редактирования аватара пользователя (сабмит формы)
function handlePopupChangeAvatar(inputsData) {
  popupFormChangeAvatar.renderSaving(true);

  api.changedAvatar(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupFormChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormChangeAvatar.renderSaving(false);
    })
}



// --- СЛУШАТЕЛИ СОБЫТИЙ ---
//обработчик клика открытия попапа по кнопке 'Редактирования профиля'
editButton.addEventListener('click', () => {
  popupFormProfile.open();
  handleTextInput();
  validFormPopupProfile.resetValidationState();
});

//oбработчик клика открытия попапа по кнопке 'Добавление карточки'
addPhotoButton.addEventListener('click', () => {
  popupFormAddCard.open();
  validFormPopupAddCard.resetValidationState();
});

//oбработчик клика открытия попапа по кнопке 'Редактирование аватара'
changeAvatarButton.addEventListener('click', () => {
  popupFormChangeAvatar.open();
  validFormPopupAddCard.resetValidationState();
});



// --- ДЕЙСТВИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
//создаем экземпляр класса Section
const cardList = new Section({
    renderer: (cardItem, id) => {
      cardList.addItem(createCard(cardItem, id));
    },
  },
  selectorObj.elementsSelector
);


//создаем экземпляр класса PopupWhithImage и навешиваем слушатели событий
const popupWithImage = new PopupWithImage(selectorObj.popupImageSelector);
popupWithImage.setEventListeners();

//создаем экземпляр класса PopupWhithConfirm
//и навешиваем слушатели событий
const popupWithConfirm = new PopupWithConfirm(selectorObj.popupConfirmSelector);
popupWithConfirm.setEventListeners();


//создаем экземпляр класса PopupWhithForm для попапа 'Редактирование профиля'
//и навешиваем слушатели событий
const popupFormProfile = new PopupWithForm(selectorObj.popupProfileSelector, handlePopupProfile);
popupFormProfile.setEventListeners();

//создаем экземпляр класса PopupWhithForm для попапа 'Добавление карточки'
//и навешиваем слушатели событий
const popupFormAddCard = new PopupWithForm(selectorObj.popupAddCardSelector, handlePopupAddCard);
popupFormAddCard.setEventListeners();

//создаем экземпляр класса PopupWhithForm для попапа 'Редактирование аватара'
//и навешиваем слушатели событий
const popupFormChangeAvatar = new PopupWithForm(selectorObj.popupChangeAvatarSelector, handlePopupChangeAvatar);
popupFormChangeAvatar.setEventListeners();


//создаем экземпляры класса FormValidator и включаем валидацию форм
const validFormPopupAddCard = new FormValidator(validationObject, selectorObj.popupAddCardSelector);
validFormPopupAddCard.enableValidation();

const validFormPopupProfile = new FormValidator(validationObject, selectorObj.popupProfileSelector);
validFormPopupProfile.enableValidation();

const validFormPopupChangeAvatar = new FormValidator(validationObject, selectorObj.popupChangeAvatarSelector);
validFormPopupChangeAvatar.enableValidation();


//создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  selectorName: selectorObj.profileNameSelector,
  selectorJob: selectorObj.profileJobSelector,
  selectorAvatar: selectorObj.avatarSelector,
});

//создаем экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: '28180a9a-c680-40bd-99cb-2b6693fb89d7',
    'Content-Type': 'application/json'
  }
});

//в Promise.all передаем массив промисов, которые нужно выполнить
Promise.all([
    api.getUserData(),
    api.getInitialCards()
  ])
  .then((values) => {
    userInfo.setUserInfo(values[0])
    cardList.renderItems(values[1], values[0]._id);
  })
  .catch((err) => {
    console.log(err);
  });
