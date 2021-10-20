class FormValidator {
    constructor(config, formName) {
        this._config = config;
        this._formName = formName;
        this._inputList = Array.from(this._formName.querySelectorAll(config.inputList));
        this._submitButton = this._formName.querySelector(config.submitButton);
    }

    _hideErrorMessage(inputElement) {
        const { inputErrorClass, errorClass } = this._config;
        const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
    
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
    
        errorElement.textContent = ''
    }

    _showErrorMessage(inputElement) {
        const { inputErrorClass, errorClass } = this._config;
        const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
    
        inputElement.classList.add(inputErrorClass);
        errorElement.classList.add(errorClass);
    
        errorElement.textContent = inputElement.validationMessage;
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideErrorMessage(inputElement, this._config);
        }
        else {
            this._showErrorMessage(inputElement, this._config);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((item) => {
          if (item.validity.valid) {
            return false;
          }
          else {
            return true;
          }
        })
    }

    _toggleButtonState() {
        const { inputSelector, submitButtonSelector } = this._config;
        const buttonElement = this._formName.querySelector(submitButtonSelector);
        const inputList = Array.from(this._formName.querySelectorAll(inputSelector));
        if (this._hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
        }
        else {
            buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        const { inputSelector, submitButtonSelector, ...rest} = this._config;  
        const inputList = Array.from(this._formName.querySelectorAll(inputSelector));
        const buttonElement = this._formName.querySelector(submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
    
        inputList.forEach((inputElement) => {
            this._checkInputValidity(inputElement, rest);
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement, rest);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }

    resetForm() {
        const { inputSelector, submitButtonSelector, ...rest } = this._config;
        this._formName.reset();
        const inputList = Array.from(this._formName.querySelectorAll(inputSelector));
        inputList.forEach((input) => {
            this._hideErrorMessage(input, rest);
            const inputList = Array.from(this._formName.querySelectorAll(inputSelector));
            const buttonElement = this._formName.querySelector(submitButtonSelector);
            this._toggleButtonState(inputList, buttonElement);
        })
    }

    enableValidation() {
        
    
        this._setEventListeners(this._formName);
    }
}

export { FormValidator }
