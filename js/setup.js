'use strict';
(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupElement = document.querySelector('.setup');
  var coatColorInputElement = setupElement.querySelector('input[name=coat-color]');
  var eyesColorInputElement = setupElement.querySelector('input[name=eyes-color]');
  var fireballColorInputElement = setupElement.querySelector('input[name=fireball-color]');
  var wizardCoatElement = setupElement.querySelector('.wizard-coat');
  var wizardEyesElement = setupElement.querySelector('.wizard-eyes');
  var wizardFireballElement = setupElement.querySelector('.setup-fireball-wrap');
  var userNameInputElement = setupElement.querySelector('.setup-user-name');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // создание магов

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

  // изменение цветов магов

  var onCoatClick = function () {
    var color = getRandomElement(COAT_COLORS);
    wizardCoatElement.style.fill = color;
    coatColorInputElement.value = color;
  };

  var onEyesClick = function () {
    var color = getRandomElement(EYES_COLORS);
    wizardEyesElement.style.fill = color;
    eyesColorInputElement.value = color;
  };
  var onFireballClick = function () {
    var color = getRandomElement(FIREBALL_COLORS);
    wizardFireballElement.style.background = color;
    fireballColorInputElement.value = color;
  };

  window.setup = {
    openPopupAction: function () {
      wizardCoatElement.addEventListener('click', onCoatClick);
      wizardEyesElement.addEventListener('click', onEyesClick);
      wizardFireballElement.addEventListener('click', onFireballClick);

    },
    closePopupAction: function () {
      wizardCoatElement.removeEventListener('click', onCoatClick);
      wizardEyesElement.removeEventListener('click', onEyesClick);
      wizardFireballElement.removeEventListener('click', onFireballClick);
    }
  };


  // валидация формы

  userNameInputElement.addEventListener('invalid', function () {
    if (userNameInputElement.validity.tooShort) {
      userNameInputElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInputElement.validity.tooLong) {
      userNameInputElement.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else {
      userNameInputElement.setCustomValidity('');
    }
  });

})();
