'use strict';
var setupElement = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

setupElement.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var getRandomElement = function (array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
};

var getWizards = function (names, surnames, coatColors, eyesColors) {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: getRandomElement(names) + ' ' + getRandomElement(surnames),
      coatColor: getRandomElement(coatColors),
      eyesColor: getRandomElement(eyesColors)
    };
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').setAttribute('style', 'fill:' + wizard.coatColor);
  wizardElement.querySelector('.wizard-eyes').setAttribute('style', 'fill:' + wizard.eyesColor);
  return wizardElement;
};

var wizardsData = getWizards(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);

var getWizardsFragment = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

similarListElement.appendChild(getWizardsFragment(wizardsData));
