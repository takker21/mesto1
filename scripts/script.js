// 1. Карточки из "коробки"
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
  const popups = document.querySelectorAll(".popup");

  const nameProfile = document.querySelector(".profile__name")
  const aboutProfile = document.querySelector(".profile__job")

  const userInfoEdit = document.querySelector(".profile__edit");
  const popupEdit = document.querySelector(".popup_type_edit")
  const formEditProfile = popupEdit.querySelector(".popup__form")
  const nameInput = formEditProfile.elements.name;
  const aboutInput = formEditProfile.elements.about;
  const placeButtonAdd = document.querySelector(".profile__button")

  const popupNewCard = document.querySelector(".popup_type_new-card")
  const formNewCard = popupNewCard.querySelector(".popup__form")
  const placeInput = formNewCard.querySelector("#place-input")
  const imgInput = formNewCard.querySelector("#img-input")
  const submitButtonAddForm = formNewCard.querySelector('.popup__button'); 
  const popupImage = document.querySelector(".popup_type_image")
  const image = document.querySelector(".figure__image")
  const figcaption = document.querySelector(".figure__figcaption")

  const placesList = document.querySelector('.elements')
  const cardTemplate = document.querySelector('#card-template').content

  
  const popupImageClose = document.querySelector('.popup__close_image');
  const popupImageImage = document.querySelector('.figure__image');


  function renderItemStart () {
    initialCards.forEach((item) => {
      renderItem(item.name, item.link)
    })
  }
  renderItemStart()
  
  //Рендер карточки
  function renderItem(name, link) {
    const htmlElement = createCard(name, link)
    placesList.prepend(htmlElement)
  }

  //Создание карточки
  function createCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true)
    const elementPic = cardElement.querySelector('.element__image');
    cardElement.querySelector('.element__name').textContent = name
    elementPic.src = link
    elementPic.alt = name

    handleLikePlace(cardElement)
    handleDeletePlace(cardElement)
    handlePopupPlaceImage(cardElement, name, link)

    return cardElement
  }
  
//Лайк
  function handleLikePlace(cardElement) {
    cardElement.querySelector('.element__like-icon').addEventListener('click', (cardElement) => {
      cardElement.target.classList.toggle('element__like-icon_liked')
    })
  }
 //Удалить 
  function handleDeletePlace(cardElement) {
    cardElement.querySelector('.element__delete-icon').addEventListener('click', (cardElement) => {
      cardElement.target.closest('.element').remove()
    })
  }
//Увеличить
  function handlePopupPlaceImage(cardElement, name, link) {
    cardElement.querySelector('.element__image').addEventListener('click', () => {
      image.src = link
      image.alt = name
      figcaption.textContent = name
      openPopup(popupImage)
    })
  } 


//8. Получение имени и информации о себе в поля ввода
function handlePopupEditOpen() {
  openPopup(popupEdit)
  nameInput.value = nameProfile.textContent
  aboutInput.value = aboutProfile.textContent
}


//Смена контента на введённое значение в поля формы по клику на кнопку "Сохранить"

function handlePopupEditSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value
  aboutProfile.textContent = aboutInput.value
  closePopup(popupEdit)
}


function handlePopupNewCardOpen() {
  openPopup(popupNewCard)
  formNewCard.reset()
  
}

function handlePopupNewCardSubmit(evt) {
  evt.preventDefault()
  renderItem(placeInput.value, imgInput.value)
  closePopup(popupNewCard)

}

//Закрытие модальных окон
function closePopup(popup) {
  popup.classList.remove("popup_is-opened")
  
}

//Создание общего открытия и закрытия попапов
popups.forEach((item) => {
  item.addEventListener("click", (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains("popup__close")) {
        
          closePopup(item)
          
      }
  })
})


function openPopup(popup) {
  popup.classList.add("popup_is-opened")

}


// Слушатели событий
userInfoEdit.addEventListener("click", handlePopupEditOpen)
formEditProfile.addEventListener("submit", handlePopupEditSubmit)
placeButtonAdd.addEventListener("click", handlePopupNewCardOpen)
formNewCard.addEventListener("submit", handlePopupNewCardSubmit)



