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

// Функция создания карточки
function createCard(name, link) {
    const placeCard = document.createElement('div');
    const cardImage = document.createElement('div');
    const cardDeleteIcon = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const cardLikeIcon = document.createElement('button');
    const placesList = document.querySelector('div.places-list');

    const popupImage = document.querySelector('.popup-image');
    const popupImageClose = document.querySelector('.popup-image__close');
    const popupImageImage = document.querySelector('.popup-image__image');

    cardName.textContent = name;
    cardImage.setAttribute('style', `background-image: url(${link})`);

    placeCard.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    cardDeleteIcon.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardLikeIcon.classList.add('place-card__like-icon');

    cardImage.appendChild(cardDeleteIcon);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(cardLikeIcon);

    placeCard.appendChild(cardImage);
    placeCard.appendChild(cardDescription);
    placesList.appendChild(placeCard);

    //вешаем обработчик события удаления
    cardDeleteIcon.addEventListener('click',delHandler);
    //вешаем обработчик события лайка
    cardLikeIcon.addEventListener('click',likeHandler);

    //вешаем обработчик события открытия popup с картинкой
    cardImage.addEventListener('click', () => {
        popupImage.classList.add('popup-image_is-opened');
        popupImageImage.src = link;
    });
    //и вешаем обработчик события закрытия popup с картинкой
        popupImageClose.addEventListener('click', () => {
            popupImage.classList.remove('popup-image_is-opened');
    })
    
}



// Функция добавления карточки
function addCard() {

    for (let i = 0; i < initialCards.length; i++) {
        const data = initialCards[i];
        const name = data.name;
        const link = data.link;
        createCard(name, link);
    }
}

addCard();


// 2. Открываем форму создания карточки
const popup = document.querySelector('.popup');
const userInfoButton = document.querySelector('.profile__button');

function addClassToPopup() {
    popup.classList.add('popup_is-opened');
}

// 3. Закрываем форму кликом по крестику
const popupClose = document.querySelector('.popup__close');

function deleteClassToPopup() {
    popup.classList.remove('popup_is-opened');
    form.name.value = '';
    form.link.value = '';
}


//5. Добавление карточки пользователем
let form = document.forms.new;
function addCustomUserCard(event) {

		let name = form.name.value;
		let link = form.link.value;
		//создаем елемент-контейнер
		createCard(name, link);
		//запрещаем перезагрузку страницы
		event.preventDefault();
		//закрываем попап при событии submit
        deleteClassToPopup();
        addDisabledForButton();
}


//6. Открываем форму редактирования данных пользователя
const popupEdit = document.querySelector('.popup-edit');
const userInfoEdit = document.querySelector('.profile__edit');

function addClassToPopupEdit() {
    popupEdit.classList.add('popup_is-opened');
}


//7. Закрываем форму редактирования данных пользователя
const popupEditClose = document.querySelector('.popup-edit__close');
function deleteClassToPopupEdit() {
    popupEdit.classList.remove('popup_is-opened');
}


//8. Получение имени и информации о себе в поля ввода
let infoName = document.querySelector('.profile__name').textContent;
let infoJob = document.querySelector('.profile__job').textContent;
const nameProfile = document.forms.profile.elements.name;
const aboutProfile = document.forms.profile.elements.about;

nameProfile.value = infoName;
aboutProfile.value = infoJob;

//Смена контента на введённое значение в поля формы по клику на кнопку "Сохранить"
const popupEditButton = document.querySelector('.popup-edit__button');

popupEditButton.addEventListener('click', function(event) {
    const userName = document.querySelector('.profile__name');
    const userJob = document.querySelector('.profile__job');
    userName.textContent = nameProfile.value;
    userJob.textContent = aboutProfile.value;

    //запрещаем перезагрузку страницы
	event.preventDefault();
    //закрываем попап при событии click
	deleteClassToPopupEdit();
});


//ф-ия обработчик  на лайк
function likeHandler(event) {
        	event.target.classList.toggle('place-card__like-icon_liked');
        	//запрещаем всплытие
            event.stopPropagation();
}
//ф-ия обработчик  на удаление
function delHandler(event) {
			const placesList = document.querySelector('div.places-list');
            placesList.removeChild(event.target.parentNode.parentNode);
            event.stopPropagation();
}

// Слушатели событий
userInfoButton.addEventListener('click', addClassToPopup);
userInfoEdit.addEventListener('click', addClassToPopupEdit);
popupClose.addEventListener('click', deleteClassToPopup);
popupEditClose.addEventListener('click', deleteClassToPopupEdit);
form.addEventListener('submit',addCustomUserCard);

