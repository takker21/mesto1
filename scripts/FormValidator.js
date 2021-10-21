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
            this._submitButton.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        this._inputList.forEach((input) => {
            this._checkInputValidity(input, rest);
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(input, rest);
                this._toggleButtonState();
            })
        })
    }

    resetForm() {
     
        this._inputList.forEach((inputElement) => {
            this._hideErrorMessage(inputElement, rest);
            this._toggleButtonState();
        })
        this._formName.reset();
    }

    enableValidation() {
        this._setEventListeners(this._formName);
    }
}

export { FormValidator }
