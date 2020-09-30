'use strict';
const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURENAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const NUMBER_OF_WIZARDS = 4;

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
let getRandomArrayElement = (arr) => {
  return arr[getRandomInteger(0, arr.length - 1)];
};

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

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

let wizards = [];
for (let i = 0; i < NUMBER_OF_WIZARDS; i++) {
  wizards.push({
    name: `${getRandomArrayElement(WIZARD_NAMES)} ${getRandomArrayElement(WIZARD_SURENAMES)}`,
    coatColor: getRandomArrayElement(COAT_COLORS),
    eyesColor: getRandomArrayElement(EYES_COLORS)
  });
}

let fragment = document.createDocumentFragment();
wizards.forEach(function (wizard) {
  fragment.appendChild(renderWizard(wizard));
});

similarListElement.appendChild(fragment);
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
