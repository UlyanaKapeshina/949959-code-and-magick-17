'use strict';
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getProp = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getWizards = function (names, surnames, coatColors, eyesColors) {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: getProp(names) + ' ' + getProp(surnames),
      coatColor: getProp(coatColors),
      eyesColor: getProp(eyesColors)
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

var wizards = getWizards(NAMES, SURNAMES, COAT_COLOR, EYES_COLOR);

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

