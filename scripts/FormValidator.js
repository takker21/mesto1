class FormValidator {
    constructor(config, formName) {
        this._config = config;
        this._formName = formName;
        this._inputList = Array.from(this._formName.querySelectorAll(config.inputSelector));
        this._submitButton = this._formName.querySelector(config.submitButtonSelector);
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
            this._hideErrorMessage(inputElement);
        }
        else {
            this._showErrorMessage(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((item) => {
          if (item.validity.valid) {
            return false;
          }
          else {
            return true;
          }
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.disabled = true;
        }
        else {
            this._submitButton.disabled = false;
        }
    }

    _setEventListeners() {
        this._inputList.forEach((input) => { 
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            })
        })
    }

    resetForm() {
        this._inputList.forEach((input) => {
            this._hideErrorMessage(input);
            this._toggleButtonState();
        })
        this._formName.reset();
    }

    enableValidation() {
        this._setEventListeners(this._formName);
    }
}

export { FormValidator }
