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
      close();
    }
  };

  const onSetupSubmitClick = () => {
    if (window.setup.userNameInput.checkValidity()) {
      setupForm.submit();
    }
  };

  const open = () => {
    window.setup.setup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
    window.setup.userNameInput.addEventListener(`input`, window.setup.checkNameValidity);
    window.setup.userNameInput.addEventListener(`input`, onSetupSubmitClick);
    window.setup.setupPlayer.addEventListener(`click`, window.setup.onSetupPlayerClick);
  };

  const close = () => {
    window.setup.setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    window.setup.userNameInput.removeEventListener(`input`, window.setup.checkNameValidity);
    window.setup.userNameInput.removeEventListener(`input`, onSetupSubmitClick);
    window.setup.setupPlayer.removeEventListener(`click`, window.setup.onSetupPlayerClick);
  };

  setupOpen.addEventListener(`click`, () => {
    open();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER) {
      open();
    }
  });

  setupClose.addEventListener(`click`, () => {
    close();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER) {
      close();
    }
  });
})();
