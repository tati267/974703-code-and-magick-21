'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURENAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const NUMBER_OF_WIZARDS = 4;

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

const renderWizard = (wizard) => {
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

const fragment = document.createDocumentFragment();
wizards.forEach(function (wizard) {
  fragment.appendChild(renderWizard(wizard));
});

similarListElement.appendChild(fragment);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);


// modul4-task1
const ESC = `Escape`;
const ENTER = `Enter`;
const setup = document.querySelector(`.setup`);
const userNameInput = setup.querySelector(`.setup-user-name`);
const coatColorInput = setup.querySelector(`.setup-coat-color`);
const eyesColorInput = setup.querySelector(`.setup-eyes-color`);
const fireballColorInput = setup.querySelector(`.setup-fireball-color`);
const setupForm = setup.querySelector(`.setup-wizard-form`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setup.querySelector(`.setup-close`);
const setupPlayer = setup.querySelector(`.setup-player`);
const setupWizardCoat = setupPlayer.querySelector(`.wizard-coat`);
const setupWizardEyes = setupPlayer.querySelector(`.wizard-eyes`);
const setupFireball = setupPlayer.querySelector(`.setup-fireball`);
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;
// Открытие/закрытие окна настройки персонажа
const onPopupEscPress = (evt) => {
  if (evt.key === ESC && evt.target !== userNameInput) {
    evt.preventDefault();
    closePopup();
  }
};

const onSetupSubmitClick = () => {
  if (userNameInput.checkValidity()) {
    setupForm.submit();
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
  userNameInput.addEventListener(`input`, checkNameValidity);
  userNameInput.addEventListener(`input`, onSetupSubmitClick);
  setupPlayer.addEventListener(`click`, onSetupPlayerClick);
};

const closePopup = () => {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  userNameInput.removeEventListener(`input`, checkNameValidity);
  userNameInput.removeEventListener(`input`, onSetupSubmitClick);
  setupPlayer.removeEventListener(`click`, onSetupPlayerClick);
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

// Валидация ввода имени персонажа
const checkNameValidity = () => {
  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`'Ещё ${(MIN_NAME_LENGTH - valueLength)} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ${(valueLength - MAX_NAME_LENGTH)} симв.`);
  } else {
    userNameInput.setCustomValidity(``);
  }
  userNameInput.reportValidity();
};
// Изменение цвета мантии,глаз и fireball персонажа по нажатию
const onSetupPlayerClick = (evt) => {
  const targetElement = evt.target;
  if (targetElement === setupWizardCoat) {
    targetElement.style.fill = getRandomArrayElement(COAT_COLORS);
    coatColorInput.value = targetElement.style.fill;
  } else if (targetElement === setupWizardEyes) {
    targetElement.style.fill = getRandomArrayElement(EYES_COLORS);
    eyesColorInput.value = targetElement.style.fill;
  } else if (targetElement === setupFireball) {
    const RANDOM_FIREBALL_COLOR = getRandomArrayElement(FIREBALL_COLORS);
    targetElement.parentNode.style.background = RANDOM_FIREBALL_COLOR;
    fireballColorInput.value = RANDOM_FIREBALL_COLOR;
  }
};

