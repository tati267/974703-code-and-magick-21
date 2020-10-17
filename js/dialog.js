"use strict";
(function () {
  const ESC = `Escape`;
  const ENTER = `Enter`;
  const setupForm = window.setup.setup.querySelector(`.setup-wizard-form`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = window.setup.setup.querySelector(`.setup-close`);

  // Открытие/закрытие окна настройки персонажа
  const onPopupEscPress = (evt) => {
    if (evt.key === ESC && evt.target !== window.setup.userNameInput) {
      evt.preventDefault();
      closePopup();
    }
  };

  const onSetupSubmitClick = () => {
    if (window.setup.userNameInput.checkValidity()) {
      setupForm.submit();
    }
  };

  const openPopup = () => {
    window.setup.setup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
    window.setup.userNameInput.addEventListener(`input`, window.setup.checkNameValidity);
    window.setup.userNameInput.addEventListener(`input`, onSetupSubmitClick);
    window.setup.setupPlayer.addEventListener(`click`, window.setup.onSetupPlayerClick);
  };

  const closePopup = () => {
    window.setup.setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    window.setup.userNameInput.removeEventListener(`input`, window.setup.checkNameValidity);
    window.setup.userNameInput.removeEventListener(`input`, onSetupSubmitClick);
    window.setup.setupPlayer.removeEventListener(`click`, window.setup.onSetupPlayerClick);
  };

  setupOpen.addEventListener(`click`, () => {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER) {
      openPopup();
    }
  });

  setupClose.addEventListener(`click`, () => {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER) {
      closePopup();
    }
  });
})();
