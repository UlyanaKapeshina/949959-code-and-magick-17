'use strict';
(function () {
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

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    document.querySelector('.setup-similar').classList.remove('hidden');
    similarListElement.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = '30px';
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };


  window.backend.load(onLoad, onError);

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').setAttribute('style', 'fill:' + wizard.colorCoat);
    wizardElement.querySelector('.wizard-eyes').setAttribute('style', 'fill:' + wizard.colorEyes);

    return wizardElement;
  };

  // изменение цветов магов

  var getRandomElement = function (array) {
    var random = Math.floor(Math.random() * array.length);
    return array[random];
  };

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
