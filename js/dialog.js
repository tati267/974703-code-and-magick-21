"use strict";
(function () {
  const ESC = `Escape`;
  const ENTER = `Enter`;
  const form = window.setup.popup.querySelector(`.setup-wizard-form`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = window.setup.popup.querySelector(`.setup-close`);

  // Открытие/закрытие окна настройки персонажа
  const onPopupEscPress = (evt) => {
    if (evt.key === ESC && evt.target !== window.setup.name) {
      evt.preventDefault();
      close();
    }
  };

  const onSetupSubmitClick = () => {
    if (window.setup.name.checkValidity()) {
      form.submit();
    }
  };

  const open = () => {
    window.setup.popup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
    window.setup.name.addEventListener(`input`, window.setup.checkNameValidity);
    window.setup.name.addEventListener(`input`, onSetupSubmitClick);
    window.setup.player.addEventListener(`click`, window.setup.onPlayerClick);
  };

  const close = () => {
    window.setup.popup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    window.setup.name.removeEventListener(`input`, window.setup.checkNameValidity);
    window.setup.name.removeEventListener(`input`, onSetupSubmitClick);
    window.setup.player.removeEventListener(`click`, window.setup.onPlayerClick);
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
