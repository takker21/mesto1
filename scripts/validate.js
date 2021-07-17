const hasInvalidInput = (inputList) => {
    return inputList.some((item) => {
      if (item.validity.valid) {
        return false;
      }
      else {
        return true;
      }
    })
  };

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    }
    else {
        buttonElement.disabled = false;
    }
}

const hideErrorMessage = (formElement, inputElement, config) => {
    //Убрать спан с ошибкой под инпутом
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);

    errorElement.textContent = ''
}

const showErrorMessage = (formElement, inputElement, config) => {
    //Добавить спан с ошибкой под инпутом
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);

    errorElement.textContent = inputElement.validationMessage;
}

const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.valid) {
        hideErrorMessage(formElement, inputElement, config);
    }
    else {
        showErrorMessage(formElement, inputElement, config);
    }
}

const setEventListeners = (formElement, config) => {
    const { inputSelector, submitButtonSelector, ...restConfig} = config;
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault;
    })

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, restConfig);
            toggleButtonState(inputList, buttonElement);
            })
        });
    }

const enableValidation = (config) => {
    const { formSelector, ...restConfig} = config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    })
};

const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_is-active'    
}

enableValidation(config);