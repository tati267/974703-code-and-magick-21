"use strict";
(function () {
  const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const WIZARD_SURENAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const NUMBER_OF_WIZARDS = 4;

  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;
  const popup = document.querySelector(`.setup`);
  const name = popup.querySelector(`.setup-user-name`);
  const coatColor = popup.querySelector(`.setup-coat-color`);
  const eyesColor = popup.querySelector(`.setup-eyes-color`);
  const fireballColor = popup.querySelector(`.setup-fireball-color`);
  const player = popup.querySelector(`.setup-player`);
  const setupWizardCoat = player.querySelector(`.wizard-coat`);
  const setupWizardEyes = player.querySelector(`.wizard-eyes`);
  const setupFireball = player.querySelector(`.setup-fireball`);
  const ESC = `Escape`;
  const ENTER = `Enter`;
  const form = popup.querySelector(`.setup-wizard-form`);

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const getRandomArrayElement = (arr) => {
    return arr[getRandomInteger(0, arr.length - 1)];
  };

  const userDialog = document.querySelector(`.setup`);
  userDialog.classList.add(`hidden`);

  const similarListElement = userDialog.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  const render = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
    return wizardElement;
  };

  const wizards = [];
  for (let i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards.push({
      name: `${getRandomArrayElement(WIZARD_NAMES)} ${getRandomArrayElement(WIZARD_SURENAMES)}`,
      coatColor: getRandomArrayElement(COAT_COLORS),
      eyesColor: getRandomArrayElement(EYES_COLORS)
    });
  }

  let successHandler = () => {
    const fragment = document.createDocumentFragment();
    wizards.forEach(function (wizard) {
      fragment.appendChild(render(wizard));
    });
    similarListElement.appendChild(fragment);
    userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  let errorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.load(successHandler, errorHandler);
  //  Диалог закроется, как только данные будут успешно сохранены.

  form.addEventListener(`submit`, function (evt) {
    window.upload(new FormData(form), function () {
      userDialog.querySelector(`.setup-similar`).classList.add(`hidden`);
    });
    evt.preventDefault();
  });
  // modul4-task1
  // Валидация ввода имени персонажа
  const checkNameValidity = () => {
    const valueLength = window.dialog.name.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      name.setCustomValidity(`'Ещё ${(MIN_NAME_LENGTH - valueLength)} симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      name.setCustomValidity(`Удалите лишние ${(valueLength - MAX_NAME_LENGTH)} симв.`);
    } else {
      name.setCustomValidity(``);
    }
    name.reportValidity();
  };
  // Изменение цвета мантии,глаз и fireball персонажа по нажатию
  const onPlayerClick = (evt) => {
    const targetElement = evt.target;
    if (targetElement === setupWizardCoat) {
      targetElement.style.fill = getRandomArrayElement(COAT_COLORS);
      coatColor.value = targetElement.style.fill;
    } else if (targetElement === setupWizardEyes) {
      targetElement.style.fill = getRandomArrayElement(EYES_COLORS);
      eyesColor.value = targetElement.style.fill;
    } else if (targetElement === setupFireball) {
      const RANDOM_FIREBALL_COLOR = getRandomArrayElement(FIREBALL_COLORS);
      targetElement.parentNode.style.background = RANDOM_FIREBALL_COLOR;
      fireballColor.value = RANDOM_FIREBALL_COLOR;
    }
  };

  window.setup = {
    popup,
    name,
    player,
    ESC,
    ENTER,
    form,
    checkNameValidity,
    onPlayerClick
  };
})();
